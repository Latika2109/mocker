import { notFound } from "next/navigation";
import { getInterview } from "@/app/actions/interview";
import InterviewSession from "./_components/InterviewSession";

async function StartInterview({ params }) {
  const { interviewId } = await params;
  const interview = await getInterview(interviewId);
  if (!interview) notFound();

  return <InterviewSession mockId={interviewId} questions={interview.questions} />;
}

export default StartInterview;
