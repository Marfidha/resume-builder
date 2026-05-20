import { createRequire } from 'module';
import ai from "../config/gemini.js";
import Resume from "../models/resume.js";
import { getAuth } from '@clerk/express';
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
Analyze the following resume text and extract the data into a clean, professional JSON format.

IMPORTANT RULES:
1. Return ONLY valid JSON.
2. Do NOT use markdown or \`\`\`json.
3. Use null or empty arrays if data is missing.
4. Do NOT repeat the same information in multiple sections.
5. Merge duplicate work experience entries if same company / same role / overlapping dates.
6. Keep descriptions concise and professional.
7. Skills must contain only unique skills (no duplicates).
8. Projects must NOT go inside achievements.
9. Achievements = awards, certifications, ranks, recognitions only.
10. Projects = applications, websites, systems, products built by candidate.
11. Rewrite summary professionally in 40-60 words with no repeated technologies.
12. Preserve factual information from resume. Do not invent fake experience.

Return exactly this JSON structure:

{
  "personalInfo": {
    "fullName": "...",
    "email": "...",
    "phone": "...",
    "location": "...",
    "linkedin": "...",
    "website": "..."
  },

  "summary": {
    "text": "..."
  },

  "education": {
    "degree": "...",
    "institution": "...",
    "location": "...",
    "graduationDate": "...",
    "gpa": "..."
  },

  "experience": {
    "entries": [
      {
        "jobTitle": "...",
        "company": "...",
        "location": "...",
        "startDate": "...",
        "endDate": "...",
        "description": "..."
      }
    ]
  },

  "skills": {
    "skillsList": ["...", "..."]
  },

  "projects": {
    "entries": [
      {
        "title": "...",
        "techStack": "...",
        "startDate": "...",
        "endDate": "...",
        "description": "..."
      }
    ]
  },

  "certifications": {
    "entries": [
      {
        "title": "...",
        "issuer": "...",
        "date": "...",
        "description": "..."
      }
    ]
  },

  "achievements": {
    "entries": [
      {
        "title": "...",
        "issuer": "...",
        "date": "...",
        "description": "..."
      }
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

Resume text:
${cleanedText}
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
  const { userId } = getAuth(req);

const savedResume = await Resume.findOneAndUpdate(
   { userId },
   { ...parsedData, userId },
   {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true,
   }
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
