'use server'

import { env } from "@/env";

const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");


const apiKey = env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash-latest",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
];


const Ai = model.startChat({
    generationConfig,
    safetySettings,
    history:[]
})

export default async function AIChatPlanner(values: {
  vision: string;
  duration: {
    from: Date;
    to: Date;
  };
}) {
  const PROMPT = env.Prompt
  const result = await Ai.sendMessage(PROMPT + ` \nGoal: ${values.vision} Duration: ${values.duration.to.getDate() - values.duration.from.getDate() + 1} days FromDate: ${values.duration.from} ToDate: ${values.duration.to}`)
  return JSON.parse(result.response.text())
}