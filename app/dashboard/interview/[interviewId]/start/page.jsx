"use client";

import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import QuestionsSection from "./_components/QuestionsSection";
import RecordAnswerSection from "./_components/RecordAnswerSection";

function StartInterview({ params }) {
  const [unwrappedParams, setUnwrappedParams] = useState(null);
  const [interviewData, setInterviewData] = useState(null);
  const [mockInterviewQuestions, setMockInterviewQuestions] = useState([]);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

  // Unwrap the params if it's a Promise
  useEffect(() => {
    if (params instanceof Promise) {
      params.then((unwrapped) => {
        setUnwrappedParams(unwrapped);
      }).catch((error) => {
        console.error("Error unwrapping params:", error);
      });
    } else {
      setUnwrappedParams(params);
    }
  }, [params]);

  useEffect(() => {
    if (unwrappedParams?.interviewId) {
      GetInterviewDetails(unwrappedParams.interviewId);
    }
  }, [unwrappedParams]);

  const GetInterviewDetails = async (interviewId) => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, interviewId));

    if (!result[0]) {
      console.error("No interview data found for interviewId:", interviewId);
      setMockInterviewQuestions([]);
      return;
    }

    const jsonMockResp = result[0]?.jsonMockResp ? JSON.parse(result[0].jsonMockResp) : [];
    console.log("jsonMockResp:", jsonMockResp);

    if (Array.isArray(jsonMockResp)) {
      setMockInterviewQuestions(jsonMockResp);
    } else {
      console.error("Invalid format for mockInterviewQuestions:", jsonMockResp, "Type:", typeof jsonMockResp);
      setMockInterviewQuestions([]);
    }

    setInterviewData(result[0]);
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Questions */}
        <QuestionsSection
          mockInterviewQuestions={mockInterviewQuestions}
          activeQuestionIndex={activeQuestionIndex}
          onQuestionClick={setActiveQuestionIndex}
        />

        {/* Video/Audio Recording */}
        <RecordAnswerSection
          mockInterviewQuestions={mockInterviewQuestions}
          activeQuestionIndex={activeQuestionIndex}
          interviewData={interviewData}
        />
      </div>
    </div>
  );
}

export default StartInterview;