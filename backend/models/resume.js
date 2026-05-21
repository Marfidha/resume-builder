import mongoose from 'mongoose';

const resumeSchema = new mongoose.Schema(
  {
   userId: {
  type: String,
  required: true,
  unique: true
},
    personalInfo: {
      fullName: String,
      email: String,
      phone: String,
      location: String,
      linkedin: String,
      website: String
    },
    summary: {
      text: String
    },
    education: {
      degree: String,
      institution: String,
      location: String,
      graduationDate: String,
      gpa: String
    },
    experience: {
      isNotApplicable: Boolean,
      entries: [
        {
          jobTitle: String,
          company: String,
          location: String,
          startDate: String,
          endDate: String,
          description: String
        }
      ]
    },
    skills: {
      isNotApplicable: Boolean,
      skillsList: [String]
    },
    certifications: {
      isNotApplicable: Boolean,
      entries: [
        {
          title: String,
          issuer: String,
          date: String,
          description: String
        }
      ]
    },
    achievements: {
      isNotApplicable: Boolean,
      entries: [
        {
          title: String,
          issuer: String,
          date: String,
          description: String
        }
      ]
    },
    projects: {
      isNotApplicable: Boolean,
      entries: [
        {
          title: String,
          issuer: String,
          date: String,
          description: String
        }
      ]
    },
    aiAnalysis: {
      atsScore: String,
      strengths: [String],
      weaknesses: [String],
      missingSkills: [String],
      improvedSummary: String
    }
  },
  { timestamps: true }
);

export default mongoose.model('Resume', resumeSchema);