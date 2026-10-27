import Link from "next/link";
import { notFound } from "next/navigation";
import { Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getInterview } from "@/app/actions/interview";
import WebcamPanel from "./_components/WebcamPanel";

async function Interview({ params }) {
  const { interviewId } = await params;
  const interview = await getInterview(interviewId);
  if (!interview) notFound();

  return (
    <div className="my-10">
      <h2 className="font-bold text-2xl">Let's Get Started</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="flex flex-col my-5 gap-5">
          <div className="p-5 rounded-lg border flex flex-col gap-5">
            <h2 className="text-lg"><strong>Job Role/Job Position:</strong> {interview.jobPosition}</h2>
            <h2 className="text-lg"><strong>Job Description/Tech Stack:</strong> {interview.jobDesc}</h2>
            <h2 className="text-lg"><strong>Years of Experience:</strong> {interview.jobExperience}</h2>
          </div>
          <div className="p-5 border rounded-lg border-yellow-300 bg-yellow-100">
            <h2 className="flex gap-2 items-center text-yellow-600">
              <Lightbulb />
              <strong>Information</strong>
            </h2>
            <h2 className="mt-3 text-yellow-500">{process.env.NEXT_PUBLIC_INFORMATION}</h2>
          </div>
        </div>
        <div>
          <WebcamPanel />
        </div>
      </div>
      <div className="flex justify-end">
        <Button asChild>
          <Link href={`/dashboard/interview/${interviewId}/start`}>Start Interview</Link>
        </Button>
      </div>
    </div>
  );
}

export default Interview;
