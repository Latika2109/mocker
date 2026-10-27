"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Webcam from "react-webcam";
import useSpeechToText from "react-hook-speech-to-text";
import { Mic, StopCircle } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { saveAnswer } from "@/app/actions/interview";

const MIN_ANSWER_LENGTH = 10;

function RecordAnswerSection({ mockId, questionIndex }) {
  const [saving, setSaving] = useState(false);
  // True from pressing Record until the recognizer ends, so an answer is saved
  // whether the user stops it or the browser ends it after a pause.
  const active = useRef(false);
  const { error, interimResult, isRecording, results, setResults, startSpeechToText, stopSpeechToText } =
    useSpeechToText({ continuous: true, useLegacyResults: false });

  const transcript = [...results.map((r) => r.transcript), interimResult].filter(Boolean).join(" ").trim();

  // The recognizer has finished (isRecording flipped to false), so `results` is final.
  useEffect(() => {
    if (isRecording || !active.current) return;
    active.current = false;

    if (transcript.length < MIN_ANSWER_LENGTH) {
      toast.error("Answer is too short, please record again");
      return;
    }
    setSaving(true);
    saveAnswer({ mockId, questionIndex, userAnswer: transcript })
      .then(() => toast.success("Answer recorded successfully"))
      .catch((e) => toast.error(e.message || "Failed to save answer"))
      .finally(() => setSaving(false));
  }, [isRecording]);

  // Moving to another question discards any recording in progress.
  useEffect(() => {
    active.current = false;
    stopSpeechToText();
    setResults([]);
  }, [questionIndex]);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  const toggleRecording = () => {
    if (isRecording) return stopSpeechToText();
    setResults([]);
    active.current = true;
    startSpeechToText();
  };

  return (
    <div className="flex items-center justify-center flex-col">
      <div className="relative flex flex-col mt-20 justify-center items-center bg-black rounded-lg p-10">
        <Image src="/webcam.png" width={200} height={200} alt="webcam" className="absolute" />
        <Webcam mirrored style={{ height: 300, width: "100%", zIndex: 10 }} />
      </div>
      <Button disabled={saving || !!error} variant="outline" className="my-6" onClick={toggleRecording}>
        {saving ? (
          "Saving..."
        ) : isRecording ? (
          <span className="text-red-600 animate-pulse flex gap-2 items-center">
            <StopCircle /> Stop Recording
          </span>
        ) : (
          <span className="text-primary flex gap-2 items-center">
            <Mic /> Record Answer
          </span>
        )}
      </Button>
      {(isRecording || transcript) && (
        <p className="max-w-md text-sm text-gray-600 text-center">{transcript || "Listening..."}</p>
      )}
    </div>
  );
}

export default RecordAnswerSection;
