import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getFeedback } from "@/app/actions/interview";

async function Feedback({ params }) {
  const { interviewId } = await params;
  const data = await getFeedback(interviewId);
  if (!data) notFound();
  const { answers, average } = data;

  return (
    <div className="p-10">
      <h2 className="text-3xl font-bold text-green-500">Congratulations!</h2>
      <h2 className="font-bold text-2xl">Here is your interview feedback</h2>

      {answers.length ? (
        <>
          <h2 className="text-primary text-lg my-3">
            Overall rating: <strong>{average?.toFixed(1)}/10</strong>
          </h2>
          <h2 className="text-sm text-gray-500">Find the question, your answer and feedback below for improvement</h2>
          {answers.map((a) => (
            <details key={a.id} className="mt-7 rounded-lg border">
              <summary className="p-2 bg-secondary rounded-lg flex justify-between gap-7 cursor-pointer">
                {a.question}
                <ChevronsUpDown className="h-5 w-5 shrink-0" />
              </summary>
              <div className="flex flex-col gap-2 p-2">
                <h2 className="text-red-500 p-2 border rounded-lg"><strong>Rating:</strong> {a.rating}</h2>
                <h2 className="p-2 border rounded-lg bg-red-50 text-sm text-red-900"><strong>Your answer: </strong>{a.userAnswer}</h2>
                <h2 className="p-2 border rounded-lg bg-green-50 text-sm text-green-900"><strong>Correct answer: </strong>{a.correctAnswer}</h2>
                <h2 className="p-2 border rounded-lg bg-blue-50 text-sm text-primary"><strong>Feedback: </strong>{a.feedback}</h2>
              </div>
            </details>
          ))}
        </>
      ) : (
        <h2 className="font-bold text-lg text-gray-500 my-5">No answers recorded for this interview yet.</h2>
      )}

      <Button asChild className="mt-5">
        <Link href="/dashboard">Go Home</Link>
      </Button>
    </div>
  );
}

export default Feedback;
