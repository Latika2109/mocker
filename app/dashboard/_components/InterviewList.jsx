import Link from "next/link";
import moment from "moment";
import { Button } from "@/components/ui/button";
import { listInterviews } from "@/app/actions/interview";

async function InterviewList() {
  const interviews = await listInterviews();
  if (!interviews.length) return null;

  return (
    <div>
      <h2 className="font-medium text-xl mt-10">Previous Mock Interviews</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-3">
        {interviews.map((i) => (
          <div key={i.mockId} className="border shadow-sm rounded-lg p-3">
            <h2 className="font-bold text-primary">{i.jobPosition}</h2>
            <h2 className="text-sm text-gray-600">{i.jobExperience} Years of Experience</h2>
            <h2 className="text-xs text-gray-400">{moment(i.createdAt).format("DD MMM YYYY")}</h2>
            <div className="flex justify-between gap-5 mt-2">
              <Button asChild size="sm" variant="outline" className="w-full">
                <Link href={`/dashboard/interview/${i.mockId}/feedback`}>Feedback</Link>
              </Button>
              <Button asChild size="sm" className="w-full">
                <Link href={`/dashboard/interview/${i.mockId}`}>Start</Link>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default InterviewList;
