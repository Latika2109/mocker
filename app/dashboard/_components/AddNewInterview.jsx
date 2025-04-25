"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { chatSession } from "@/utils/GeminiAIModal";
import { LoaderCircle } from "lucide-react";
import { MockInterview } from "@/utils/schema";
import { v4 as uuidv4 } from 'uuid';
import { useUser } from "@clerk/nextjs";
import moment from "moment/moment";
import { db } from "@/utils/db";
import { useRouter } from "next/navigation";

function AddNewInterview() {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [jobExperience, setJobExperience] = useState("");
  const [loading, setLoading] = useState(false);
  const [jsonResponse, setJsonResponse] = useState([]);
  const { user } = useUser();
  const router = useRouter();

  const onSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    console.log(jobPosition, jobDescription, jobExperience);

    const inputPrompt =
      "Job Position: " +
      jobPosition +
      ", job description: " +
      jobDescription +
      ", job experience: " +
      jobExperience +
      ", Based on this generate " +
      process.env.NEXT_PUBLIC_INTERVIEW_COUNT +
      " interview questions and give both question and answers in JSON format";

    try {
      const result = await chatSession.sendMessage(inputPrompt);
      let mockJsonResponse = await result.response.text();
      mockJsonResponse = mockJsonResponse
        .replace("```json", '')
        .replace("```", '');

      console.log(mockJsonResponse);
      const parsedResponse = JSON.parse(mockJsonResponse);
      setJsonResponse(parsedResponse);

      if (parsedResponse) {
        const response = await db.insert(MockInterview)
          .values({
            mockId: uuidv4(),
            jsonMockResp: JSON.stringify(parsedResponse),
            jobPosition: jobPosition,
            jobDesc: jobDescription,
            jobExperience: jobExperience,
            createdBy: user?.primaryEmailAddress?.emailAddress,
            createdAt: moment().toDate()
          }).returning({ mockId: MockInterview.mockId });

        console.log("Inserted ID:", response);
        if (response) {
          setOpenDialog(false);
          router.push('/dashboard/interview/' + response[0]?.mockId);
        }
      } else {
        console.log("ERROR");
      }
    } catch (error) {
      console.error("Error generating interview questions:", error);
    }

    setLoading(false);
  };

  return (
    <div>
      <div
        className="p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md hover:cursor-pointer transition-all"
        onClick={() => setOpenDialog(true)}
      >
        <h2 className="font-bold text-lg text-center">+ Add New</h2>
      </div>

      <Dialog open={openDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              Tell us more about the job you are interviewing for
            </DialogTitle>
            <DialogDescription>
              <form onSubmit={onSubmit}>
                <div>
                  <h2>
                    Add details about your job position/role, job descriptions,
                    and years of experience
                  </h2>
                  <div className="mt-7 my-4">
                    <label>Job Role/Job Position</label>
                    <Input
                      placeholder="Ex. Full Stack Developer"
                      required
                      onChange={(event) =>
                        setJobPosition(event.target.value)
                      }
                    />
                  </div>

                  <div className="my-4">
                    <label>Job Description/Tech Stack (In Short)</label>
                    <Textarea
                      placeholder="Ex. Angular, React, NodeJs, MySQL"
                      required
                      onChange={(event) =>
                        setJobDescription(event.target.value)
                      }
                    />
                  </div>

                  <div className="my-4">
                    <label>Years of Experience</label>
                    <Input
                      placeholder="Ex. 5"
                      type="number"
                      max="50"
                      required
                      onChange={(event) =>
                        setJobExperience(event.target.value)
                      }
                    />
                  </div>
                </div>
                <div className="flex gap-5 justify-end">
                  <button
                    type="button"
                    className="mt-5"
                    variant="ghost"
                    onClick={() => setOpenDialog(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="mt-5 px-4 py-2 text-base font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-all flex items-center gap-2"
                  >
                    {loading ? (
                      <>
                        <LoaderCircle className="animate-spin w-5 h-5" />
                        <span>Generating from AI</span>
                      </>
                    ) : (
                      "Start Interview"
                    )}
                  </button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewInterview;