import { createRequire } from 'module';
import ai from "../config/gemini.js";
import Resume from "../models/resume.js";

const require = createRequire(import.meta.url);
const pdfParse = require('pdf-parse');



export const uploadResume = async (req, res) => {
  try {

    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const data = await pdfParse(req.file.buffer);

    const cleanedText = data.text
      .replace(/\r/g, "")
      .replace(/[ \t]+/g, " ")
      .replace(/\n{3,}/g, "\n\n")
      .replace(/\s+@/g, "@")
      .replace(/MalayalamEnglish/g, "Malayalam, English")
      .replace(/[•●▪]/g, "-")
      .replace(/\.\./g, ".")
      .trim();

    // console.log("Cleaned Text:", cleanedText);
    console.log("Sending to Gemini...");

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",

      contents: `
      Analyze this resume text and extract the information into a JSON format.
      It must exactly match this structure (use null or empty arrays if data is missing):
      {
        "personalInfo": {
          "fullName": "...",
          "email": "...",
          "phone": "...",
          "location": "...",
          "linkedin": "...",
          "website": "..."
        },
        "summary": { "text": "..." },
        "education": {
          "degree": "...",
          "institution": "...",
          "location": "...",
          "graduationDate": "...",
          "gpa": "..."
        },
        "experience": {
          "entries": [
            { "jobTitle": "...", "company": "...", "location": "...", "startDate": "...", "endDate": "...", "description": "..." }
          ]
        },
        "skills": {
          "skillsList": ["...", "..."]
        },
        "certifications": {
          "entries": [
            { "title": "...", "issuer": "...", "date": "...", "description": "..." }
          ]
        },
        "achievements": {
          "entries": [
            { "title": "...", "issuer": "...", "date": "...", "description": "..." }
          ]
        },
        "aiAnalysis": {
          "atsScore": "...",
          "strengths": ["...", "..."],
          "weaknesses": ["...", "..."],
          "missingSkills": ["...", "..."],
          "improvedSummary": "..."
        }
      }

      Return ONLY valid JSON without markdown formatting like \`\`\`json.
      Resume text: ${cleanedText}
      `
    });

    const aiText = response.text;

    console.log("Gemini response received");
    
    // Parse the JSON
    let parsedData = {};
    try {
      parsedData = JSON.parse(aiText.replace(/```json/g, "").replace(/```/g, ""));
    } catch (parseError) {
      console.error("Error parsing Gemini JSON:", parseError);
      return res.status(500).json({ message: "Failed to parse AI response as JSON" });
    }

    // Save to MongoDB using upsert
    const savedResume = await Resume.findOneAndUpdate(
      { userId: req.user.id },
      { ...parsedData, userId: req.user.id },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    res.status(200).json({
      message: "PDF processed and saved successfully",
      id: savedResume._id,
      analysis: parsedData.aiAnalysis
    });

  } catch (error) {
    if (error.status === 429) {
      return res.status(429).json({
        message: "AI quota exceeded. Please try again later."
      });
    }

    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
