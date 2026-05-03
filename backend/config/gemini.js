import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

console.log("Gemini key exists:", !!process.env.GEMINI_API_KEY);
console.log("Gemini key preview:", process.env.GEMINI_API_KEY?.slice(0, 8));

export default ai;