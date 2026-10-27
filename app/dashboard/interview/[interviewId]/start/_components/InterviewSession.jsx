"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import QuestionsSection from "./QuestionsSection";
import RecordAnswerSection from "./RecordAnswerSection";

function InterviewSession({ mockId, questions }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const isLast = activeIndex === questions.length - 1;

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <QuestionsSection
          questions={questions}
          activeIndex={activeIndex}
          onQuestionClick={setActiveIndex}
        />
        <RecordAnswerSection mockId={mockId} questionIndex={activeIndex} />
      </div>
      <div className="flex justify-end gap-6">
        <Button variant="outline" disabled={activeIndex === 0} onClick={() => setActiveIndex(activeIndex - 1)}>
          Previous Question
        </Button>
        {isLast ? (
          <Button asChild>
            <Link href={`/dashboard/interview/${mockId}/feedback`}>End Interview</Link>
          </Button>
        ) : (
          <Button onClick={() => setActiveIndex(activeIndex + 1)}>Next Question</Button>
        )}
      </div>
    </div>
  );
}

export default InterviewSession;
