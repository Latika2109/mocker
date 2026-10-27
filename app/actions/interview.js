"use server";

import { currentUser } from "@clerk/nextjs/server";
import { and, desc, eq } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";
import { db } from "@/utils/db";
import { MockInterview, UserAnswer } from "@/utils/schema";
import { generateJson } from "@/utils/GeminiAIModal";

async function requireEmail() {
  const user = await currentUser();
  const email = user?.primaryEmailAddress?.emailAddress;
  if (!email) throw new Error("You must be signed in");
  return email;
}

export async function createInterview({ jobPosition, jobDesc, jobExperience }) {
  const email = await requireEmail();
  const count = process.env.INTERVIEW_COUNT || 5;

  const data = await generateJson(
    `Job Position: ${jobPosition}, Job Description: ${jobDesc}, Years of Experience: ${jobExperience}. ` +
      `Generate ${count} interview questions with answers. ` +
      `Respond with a JSON array of objects shaped {"question": string, "answer": string}.`
  );
  const questions = Array.isArray(data) ? data : data?.questions;
  if (!Array.isArray(questions) || !questions.length) {
    throw new Error("Could not generate questions, please try again");
  }

  const mockId = uuidv4();
  await db.insert(MockInterview).values({
    mockId,
    jsonMockResp: JSON.stringify(questions),
    jobPosition,
    jobDesc,
    jobExperience,
    createdBy: email,
    createdAt: new Date(),
  });
  return mockId;
}

// Returns the interview (with parsed questions) only if the signed-in user owns it.
export async function getInterview(mockId) {
  const email = await requireEmail();
  const [row] = await db
    .select()
    .from(MockInterview)
    .where(and(eq(MockInterview.mockId, mockId), eq(MockInterview.createdBy, email)));
  return row ? { ...row, questions: JSON.parse(row.jsonMockResp) } : null;
}

export async function listInterviews() {
  const email = await requireEmail();
  return db
    .select()
    .from(MockInterview)
    .where(eq(MockInterview.createdBy, email))
    .orderBy(desc(MockInterview.createdAt));
}

export async function saveAnswer({ mockId, questionIndex, userAnswer }) {
  const email = await requireEmail();
  const interview = await getInterview(mockId);
  const question = interview?.questions[questionIndex];
  if (!question) throw new Error("Question not found");

  const feedback = await generateJson(
    `Question: ${question.question}\nUser Answer: ${userAnswer}\n` +
      `Rate the answer from 1 to 10 and give feedback on how to improve it in 5-7 lines. ` +
      `Respond with JSON shaped {"rating": number, "feedback": string}.`
  );

  // Re-recording an answer replaces the previous one.
  const sameAnswer = and(
    eq(UserAnswer.mockIdRef, mockId),
    eq(UserAnswer.question, question.question),
    eq(UserAnswer.userEmail, email)
  );
  await db.delete(UserAnswer).where(sameAnswer);
  await db.insert(UserAnswer).values({
    mockIdRef: mockId,
    question: question.question,
    correctAnswer: question.answer,
    userAnswer,
    feedback: feedback.feedback,
    rating: String(feedback.rating),
    userEmail: email,
    createdAt: new Date().toISOString(),
  });
}

export async function getFeedback(mockId) {
  const email = await requireEmail();
  const interview = await getInterview(mockId);
  if (!interview) return null;

  const answers = await db
    .select()
    .from(UserAnswer)
    .where(and(eq(UserAnswer.mockIdRef, mockId), eq(UserAnswer.userEmail, email)))
    .orderBy(UserAnswer.id);
  const rated = answers.map((a) => Number(a.rating)).filter(Number.isFinite);
  const average = rated.length ? rated.reduce((a, b) => a + b, 0) / rated.length : null;
  return { interview, answers, average };
}
