import fs from "fs";
import { GoogleGenAI } from "@google/genai";
import {
  buildDocsSystemPrompt,
  buildSystemPrompt,
  buildUserPrompt,
} from "./prompt";
import type { HabitAnalysisRequest } from "./types";

const client = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY as string,
});

export async function* generateHabitAnalysis(input: HabitAnalysisRequest) {
  const diretrizes = fs.readFileSync("knowledge/diretrizes.md", "utf-8");

  const systemInstruction = [
    buildSystemPrompt(),
    buildDocsSystemPrompt(diretrizes),
  ].join("\n\n");

  const userPrompt = buildUserPrompt(input);

  const stream = await client.models.generateContentStream({
    model: "gemini-2.5-flash",
    contents: userPrompt,
    config: {
      systemInstruction,
      temperature: 0.6,
    },
  });

  for await (const chunk of stream) {
    const text = chunk.text;
    if (text) yield text;
  }
}

/*
 - stream:false > O modelo pensa, gera toda a resposta inteira, e só depois te devolve.
 - stream:true > O modelo pensa, gera a resposta parcialmente, e te devolve a cada vez que tem uma nova parte.
*/
