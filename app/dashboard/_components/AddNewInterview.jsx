"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createInterview } from "@/app/actions/interview";

function AddNewInterview() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setLoading(true);
    try {
      const mockId = await createInterview({
        jobPosition: form.get("jobPosition"),
        jobDesc: form.get("jobDesc"),
        jobExperience: form.get("jobExperience"),
      });
      router.push(`/dashboard/interview/${mockId}`);
    } catch (error) {
      toast.error(error.message || "Failed to generate interview questions");
      setLoading(false);
    }
  };

  return (
    <div>
      <div
        className="p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md hover:cursor-pointer transition-all"
        onClick={() => setOpen(true)}
      >
        <h2 className="font-bold text-lg text-center">+ Add New</h2>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">Tell us more about the job you are interviewing for</DialogTitle>
            <DialogDescription>
              Add details about your job position/role, job description and years of experience
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label>Job Role/Job Position</label>
              <Input name="jobPosition" placeholder="Ex. Full Stack Developer" required />
            </div>
            <div>
              <label>Job Description/Tech Stack (In Short)</label>
              <Textarea name="jobDesc" placeholder="Ex. Angular, React, NodeJs, MySQL" required />
            </div>
            <div>
              <label>Years of Experience</label>
              <Input name="jobExperience" type="number" min="0" max="50" placeholder="Ex. 5" required />
            </div>
            <div className="flex gap-5 justify-end">
              <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <LoaderCircle className="animate-spin" /> Generating from AI
                  </>
                ) : (
                  "Start Interview"
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewInterview;
