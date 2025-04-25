"use client";

import { useEffect, useState } from "react";
import React from "react";
import Webcam from "react-webcam";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Mic, StopCircle } from "lucide-react";
import { toast } from "sonner";
import { chatSession } from "@/utils/GeminiAIModal";
import useSpeechToText from "react-hook-speech-to-text";
import { db } from "@/utils/db";
import { useUser } from "@clerk/nextjs";
import moment from "moment";

function RecordAnswerSection({ mockInterviewQuestions = [], activeQuestionIndex, interviewData }) {
  const [userAnswer, setUserAnswer] = useState("");
  const { user } = useUser();
  const [loading, setLoading] = useState(false);

  const { error, interimResult, isRecording, results, startSpeechToText, stopSpeechToText } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  useEffect(() => {
    if (results && Array.isArray(results)) {
      setUserAnswer(results.map(result => result.transcript).join(" "));
    }
  }, [results]);

  useEffect(() => {
    if (!isRecording && userAnswer.length > 10) {
      UpdateUserAnswerInDb();
    }
  }, [userAnswer]);

  const StartStopRecording = async () => {
    if (isRecording) {
      stopSpeechToText();
      if (userAnswer?.length < 10) {
        setLoading(false);
        toast.error("Answer is too short, Please record again");
        return;
      }
    } else {
      setUserAnswer(""); // Reset user answer state for a new recording
      startSpeechToText();
    }
  };

  const UpdateUserAnswerInDb = async () => {
    console.log("User Answer:", userAnswer);
    setLoading(true);

    // Validate mockInterviewQuestions array
    if (!mockInterviewQuestions || !Array.isArray(mockInterviewQuestions) || mockInterviewQuestions.length === 0) {
      console.error("mockInterviewQuestions is empty or not an array");
      toast.error("No questions available.");
      setLoading(false);
      return;
    }

    // Validate activeQuestionIndex
    if (activeQuestionIndex < 0 || activeQuestionIndex >= mockInterviewQuestions.length) {
      console.error("Invalid activeQuestionIndex:", activeQuestionIndex);
      toast.error("Invalid question index.");
      setLoading(false);
      return;
    }

    const selectedQuestion = mockInterviewQuestions[activeQuestionIndex];

    if (!selectedQuestion || !selectedQuestion.question) {
      console.error("Selected question is undefined or missing properties");
      toast.error("Question data is missing.");
      setLoading(false);
      return;
    }

    // AI-generated feedback prompt
    const feedbackPrompt = `
      Question: ${selectedQuestion.question},
      User Answer: ${userAnswer}.
      Please give us a rating for the answer and feedback as an area of improvement
      if any in just 5-7 lines to improve it in JSON format with rating and feedback fields.
    `;

    try {
      const result = await chatSession.sendMessage(feedbackPrompt);
      const responseText = await result.response.text();
      const jsonStart = responseText.indexOf('{');
      const jsonEnd = responseText.lastIndexOf('}') + 1;
      const mockJsonResp = responseText.slice(jsonStart, jsonEnd);
      const JsonFeedbackResp = JSON.parse(mockJsonResp);

      // Insert into DB
      const resp = await db.insert("user_answers").values({
        mockIdRef: interviewData?.mockId,
        question: selectedQuestion?.question || "Unknown",
        correctAnswer: selectedQuestion?.correctAnswer || "Unknown",
        userAnswer: userAnswer,
        feedback: JsonFeedbackResp?.feedback,
        rating: JsonFeedbackResp?.rating,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
      });

      if (resp) {
        toast("User Answer Recorded Successfully");
      }
      setUserAnswer("");
    } catch (error) {
      console.error("Error processing feedback:", error);
      toast.error("Failed to save answer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center flex-col">
      <div className="flex flex-col mt-20 justify-center items-center bg-black rounded-lg p-10">
        <Image src={"/webcam.png"} width={200} height={200} alt="webcam" className="absolute" />
        <Webcam
          style={{
            mirrored: true,
            height: 300,
            width: "100%",
            zIndex: 10,
          }}
        />
      </div>
      <Button 
        disabled={loading}
        variant="outline" 
        className="my-10" 
        onClick={StartStopRecording}
      >
        {isRecording ? 
          <h2 className="text-red-600 animate-pulse flex gap-2 items-center">
            <StopCircle/> Stop Recording
          </h2>
        : <h2 className="text-primary flex gap-2 items-center">
          <Mic/> Record Answer
        </h2>
        }
      </Button>
      <Button onClick={() => console.log("User Answer:", userAnswer)}>Show User Answer</Button>
    </div>
  );
}
export default RecordAnswerSection;
