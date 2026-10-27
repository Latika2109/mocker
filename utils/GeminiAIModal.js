import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: process.env.GEMINI_MODEL || "gemini-2.5-flash",
  generationConfig: { temperature: 1, responseMimeType: "application/json" },
});

// Each call is stateless, so earlier prompts never leak into later ones.
export async function generateJson(prompt) {
  const result = await model.generateContent(prompt);
  return JSON.parse(result.response.text());
}
