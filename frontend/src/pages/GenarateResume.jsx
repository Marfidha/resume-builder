import React, { useState, useEffect, useRef } from 'react';
import {
  FileText,
  Download,
  Edit3,
  CheckCircle,
  ChevronLeft,
  Sparkles,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Globe,
  Activity,
  Eye,
  Menu,
  X,
  AlertCircle,
  Crosshair,
  ChevronDown
} from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { PDFDownloadLink } from '@react-pdf/renderer';
import ResumePDF from './ResumePDF';
import { motion, AnimatePresence } from 'framer-motion';
import { toPng, toJpeg } from 'html-to-image';
import API_BASE_URL from "../config/api.js";

const GenarateResume = () => {
  const [activeMode, setActiveMode] = useState('resume'); // 'resume' | 'analysis'
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDownloadMenuOpen, setIsDownloadMenuOpen] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const [resume, setResume] = useState(null);
  const resumeContentRef = useRef(null);

  const handleDownloadImage = async (type) => {
    if (activeMode !== 'resume') {
      setActiveMode('resume');
      await new Promise(resolve => setTimeout(resolve, 500)); // wait for animation
    }
    if (!resumeContentRef.current) return;
    try {
      const options = { quality: 1.0, pixelRatio: 2, backgroundColor: '#ffffff' };
      const dataUrl = type === 'png'
        ? await toPng(resumeContentRef.current, options)
        : await toJpeg(resumeContentRef.current, options);

      const link = document.createElement('a');
      link.download = `resume.${type}`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error(`Error generating ${type}:`, err);
    }
  };

  const handleDownloadDocx = async () => {
    if (activeMode !== 'resume') {
      setActiveMode('resume');
      await new Promise(resolve => setTimeout(resolve, 500)); // wait for animation
    }
    if (!resumeContentRef.current) return;
    const header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Resume</title></head><body>";
    const footer = "</body></html>";
    const sourceHTML = header + resumeContentRef.current.innerHTML + footer;

    const blob = new Blob(['\ufeff', sourceHTML], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'resume.doc';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    if (!id) return;

    const fetchResume = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/resumes/${id}`);
        setResume(res.data);
      } catch (err) {
        console.error("Error fetching resume:", err);
      }
    };

    fetchResume();
  }, [id]);

  const handleEditResume = () => {
    navigate(`/edit/${id}`);
  };

  if (!resume) return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
      <p className="mt-4 text-slate-600 font-medium">Loading your professional profile...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-800 pt-24 pb-12 relative">
      {/* Background Noise */}
      <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8 items-start">

          {/* Sidebar */}
          <aside className="w-full lg:w-72 flex-shrink-0 bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden lg:sticky lg:top-28 z-30">
            <div className="p-6 bg-slate-50 border-b border-slate-100">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                {/* <FileText className="w-5 h-5 text-indigo-600" /> */}
                Workspace
              </h2>
            </div>

            <nav className="p-6 space-y-8">
              {/* View Toggle */}
              <div>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3 px-1">Current View</p>
                <button
                  onClick={() => setActiveMode(activeMode === 'resume' ? 'analysis' : 'resume')}
                  className="w-full flex items-center justify-center gap-2.5 px-4 py-3.5 bg-[#0D4D3B] text-white rounded-xl font-semibold hover:bg-slate-800 transition-all shadow-sm shadow-slate-900/10 active:scale-[0.98]"
                >
                  {activeMode === 'resume' ? (
                    <>

                      View AI Analysis
                    </>
                  ) : (
                    <>
                      <Eye className="w-5 h-5 text-teal-400" />
                      View Resume
                    </>
                  )}
                </button>
              </div>

              <div className="space-y-1">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3 px-1 mt-6">Quick Actions</p>

                <div className="relative">
                  <button
                    onClick={() => setIsDownloadMenuOpen(!isDownloadMenuOpen)}
                    className="w-full flex items-center justify-between px-4 py-3 text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-xl font-medium transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Download className="w-5 h-5" />
                      Download Resume
                    </div>
                    <ChevronDown className={`w-4 h-4 transition-transform ${isDownloadMenuOpen ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {isDownloadMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden z-50 flex flex-col"
                      >
                        <PDFDownloadLink
                          document={<ResumePDF resume={resume} />}
                          fileName="resume.pdf"
                          className="w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors text-left font-medium"
                          onClick={() => setTimeout(() => setIsDownloadMenuOpen(false), 100)}
                        >
                          {({ loading }) => loading ? 'Generating...' : 'PDF'}
                        </PDFDownloadLink>

                        <button
                          onClick={() => { handleDownloadDocx(); setIsDownloadMenuOpen(false); }}
                          className="w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors text-left font-medium"
                        >
                          DOCX
                        </button>

                        <button
                          onClick={() => { handleDownloadImage('png'); setIsDownloadMenuOpen(false); }}
                          className="w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors text-left font-medium"
                        >
                          PNG
                        </button>

                        <button
                          onClick={() => { handleDownloadImage('jpeg'); setIsDownloadMenuOpen(false); }}
                          className="w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors text-left font-medium"
                        >
                          JPG
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <button
                  onClick={handleEditResume}
                  className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-xl font-medium transition-colors"
                >
                  <Edit3 className="w-5 h-5" />
                  Edit Resume
                </button>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <button
                  onClick={() => navigate(-1)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors rounded-lg hover:bg-slate-50"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Back to Editor
                </button>
              </div>
            </nav>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 w-full min-w-0">
            <AnimatePresence mode="wait">
              {activeMode === 'resume' ? (
                <motion.div
                  key="resume"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="max-w-4xl mx-auto"
                >
                  {/* Resume Preview */}
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 p-10 md:p-16">

                    {/* Actual Resume Content */}
                    <div ref={resumeContentRef} id="pdf-content" className="max-w-4xl mx-auto text-slate-800">
                      <header className="mb-8">
                        <h1 className="text-4xl font-bold mb-4 tracking-tight">{resume.personalInfo?.fullName}</h1>
                        <div className="flex flex-wrap gap-y-2 gap-x-4 text-sm text-slate-600 font-medium">
                          <div className="flex items-center gap-1">
                            <Mail className="w-4 h-4" /> {resume.personalInfo?.email}
                          </div>
                          <div className="text-slate-300">•</div>
                          <div className="flex items-center gap-1">
                            <Phone className="w-4 h-4" /> {resume.personalInfo?.phone}
                          </div>
                          <div className="text-slate-300">•</div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" /> {resume.personalInfo?.location}
                          </div>
                          <div className="w-full flex gap-x-4 mt-1">
                            {resume.personalInfo?.linkedin && (
                              <>
                                <div className="flex items-center gap-1">
                                  <Linkedin className="w-4 h-4" /> {resume.personalInfo.linkedin}
                                </div>
                                <div className="text-slate-300">•</div>
                              </>
                            )}
                            {resume.personalInfo?.website && (
                              <div className="flex items-center gap-1">
                                <Globe className="w-4 h-4" /> {resume.personalInfo.website}
                              </div>
                            )}
                          </div>
                        </div>
                      </header>

                      <hr className="border-slate-800 border-t-[1.5px] mb-8" />

                      {resume.summary?.text && (
                        <section className="mb-8">
                          <h2 className="text-sm font-black uppercase tracking-widest mb-4">Professional Summary</h2>
                          <p className="text-sm leading-relaxed text-slate-700">
                            {resume.summary.text}
                          </p>
                        </section>
                      )}

                      {resume.experience?.entries?.length > 0 && (
                        <section className="mb-8">
                          <h2 className="text-sm font-black uppercase tracking-widest mb-4">Work Experience</h2>
                          {resume.experience.entries.map((exp, i) => (
                            <div key={i} className="mb-6">
                              <div className="flex justify-between items-baseline mb-1">
                                <h3 className="font-bold text-[15px]">{exp.jobTitle}</h3>
                                <span className="text-xs text-slate-500 font-semibold">{exp.startDate} - {exp.endDate || "Present"}</span>
                              </div>
                              <div className="text-sm font-medium text-slate-600 mb-3">{exp.company} {exp.location && `• ${exp.location}`}</div>
                              <p className="text-sm text-slate-700 whitespace-pre-line">{exp.description}</p>
                            </div>
                          ))}
                        </section>
                      )}

                      {resume.education?.degree && (
                        <section className="mb-8">
                          <h2 className="text-sm font-black uppercase tracking-widest mb-4">Education</h2>
                          <div className="flex justify-between items-baseline mb-1">
                            <h3 className="font-bold text-[15px]">{resume.education.degree}</h3>
                            <span className="text-xs text-slate-500 font-semibold">{resume.education.graduationDate}</span>
                          </div>
                          <div className="flex justify-between text-sm text-slate-600 font-medium">
                            <span>{resume.education.institution} • {resume.education.location}</span>
                          </div>
                        </section>
                      )}

                      {resume.skills?.skillsList?.length > 0 && (
                        <section className="mb-8">
                          <h2 className="text-sm font-black uppercase tracking-widest mb-4">Skills</h2>
                          <div className="text-sm leading-loose font-medium text-slate-700">
                            {resume.skills.skillsList.join(" • ")}
                          </div>
                        </section>
                      )}

                      {resume.certifications?.entries?.length > 0 && (
                        <section className="mb-8">
                          <h2 className="text-sm font-black uppercase tracking-widest mb-4">Certifications</h2>
                          {resume.certifications.entries.map((cert, i) => (
                            <div key={i} className="mb-4">
                              <div className="flex justify-between items-baseline">
                                <h3 className="font-bold text-[15px]">{cert.title}</h3>
                                <span className="text-xs text-slate-500 font-semibold">{cert.date}</span>
                              </div>
                              <div className="text-sm text-slate-600 font-medium">{cert.issuer || 'Certification'}</div>
                            </div>
                          ))}
                        </section>
                      )}

                      {resume.achievements?.entries?.length > 0 && (
                        <section>
                          <h2 className="text-sm font-black uppercase tracking-widest mb-4">Achievements</h2>
                          <ul className="text-sm space-y-2 text-slate-700">
                            {resume.achievements.entries.map((a, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className="text-[#0D9488]">•</span>
                                {a.title}
                              </li>
                            ))}
                          </ul>
                        </section>
                      )}
                      {resume.projects?.entries?.length > 0 && (
  <section className="mb-8">
    <h2 className="text-sm font-black uppercase tracking-widest mb-4">
      Projects
    </h2>

    {resume.projects.entries.map((project, i) => (
      <div key={i} className="mb-6">
        <div className="flex justify-between items-baseline mb-1">
          <h3 className="font-bold text-[15px]">
            {project.title}
          </h3>

          <span className="text-xs text-slate-500 font-semibold">
            {project.startDate} - {project.endDate}
          </span>
        </div>

        {project.techStack && (
          <div className="text-sm text-slate-600 font-medium mb-2">
            Tech Stack: {project.techStack}
          </div>
        )}

        <p className="text-sm text-slate-700 whitespace-pre-line">
          {project.description}
        </p>
      </div>
    ))}
  </section>
)}
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="analysis"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="max-w-5xl mx-auto space-y-6"
                >
                  {!resume.aiAnalysis ? (
                    <div className="bg-white p-12 rounded-2xl shadow-sm border border-slate-200/60 text-center flex flex-col items-center justify-center">
                      <Activity className="w-16 h-16 text-slate-200 mb-4" />
                      <h3 className="text-xl font-bold text-slate-900 mb-2">No AI Analysis Found</h3>
                      <p className="text-slate-500 max-w-sm">We couldn't find an AI analysis for this resume. Please edit your resume and generate a new analysis.</p>
                    </div>
                  ) : (
                    <>
                      <div className="bg-white p-5 md:p-6 rounded-2xl shadow-sm border border-slate-200/60 flex items-center justify-between gap-4">
                        <div>

                          <h3 className="text-xl font-black text-slate-900 mb-1 tracking-tight">
                            ATS Compatibility Score
                          </h3>
                          <p className="text-sm text-slate-500 font-medium">Based on industry standards and keyword optimization algorithms</p>
                        </div>

                        {/* Circular Progress */}
                        <div className="relative w-20 h-20 flex items-center justify-center shrink-0">
                          <svg className="w-full h-full transform -rotate-90 drop-shadow-sm" viewBox="0 0 36 36">
                            <path
                              className="text-slate-100"
                              strokeWidth="3.5"
                              stroke="currentColor"
                              fill="none"
                              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            />
                            <path
                              className="text-indigo-500"
                              strokeWidth="3.5"
                              strokeDasharray={`${resume.aiAnalysis.atsScore}, 100`}
                              strokeLinecap="round"
                              stroke="currentColor"
                              fill="none"
                              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center flex-col">
                            <span className="text-2xl font-black text-slate-900 tracking-tighter">{resume.aiAnalysis.atsScore}</span>
                          </div>
                        </div>
                      </div>

                      {resume.aiAnalysis.improvedSummary && (
                        <div className="bg-[#0D4D3B] from-indigo-900 to-indigo-800 p-8 md:p-10 rounded-2xl shadow-sm text-white relative overflow-hidden">

                          <div className="relative z-10">
                            <h4 className="font-bold text-indigo-200 mb-4 flex items-center gap-2 text-sm uppercase tracking-widest">
                              Suggested Summary
                            </h4>
                            <p className="text-lg md:text-xl font-medium leading-relaxed text-white/90">
                              "{resume.aiAnalysis.improvedSummary}"
                            </p>
                          </div>
                        </div>
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {resume.aiAnalysis.strengths?.length > 0 && (
                          <div className="bg-white p-8 rounded-2xl border border-slate-200/60 shadow-sm relative overflow-hidden group hover:border-emerald-200 transition-colors">
                            <div className="absolute top-0 left-0 w-full h-1.5 bg-emerald-400"></div>
                            <h4 className="font-bold text-slate-900 mb-6 flex items-center gap-2.5">
                              <div className="p-2 bg-emerald-100 rounded-lg text-emerald-600"><CheckCircle className="w-5 h-5" /></div>
                              Strengths
                            </h4>
                            <ul className="space-y-4">
                              {resume.aiAnalysis.strengths.map((item, idx) => (
                                <li key={idx} className="text-sm text-slate-600 font-medium flex items-start gap-3 leading-relaxed">
                                  <span className="text-emerald-500 mt-0.5">•</span> {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {resume.aiAnalysis.weaknesses?.length > 0 && (
                          <div className="bg-white p-8 rounded-2xl border border-slate-200/60 shadow-sm relative overflow-hidden group hover:border-amber-200 transition-colors">
                            <div className="absolute top-0 left-0 w-full h-1.5 bg-amber-400"></div>
                            <h4 className="font-bold text-slate-900 mb-6 flex items-center gap-2.5">
                              <div className="p-2 bg-amber-100 rounded-lg text-amber-600"><AlertCircle className="w-5 h-5" /></div>
                              Areas to Improve
                            </h4>
                            <ul className="space-y-4">
                              {resume.aiAnalysis.weaknesses.map((item, idx) => (
                                <li key={idx} className="text-sm text-slate-600 font-medium flex items-start gap-3 leading-relaxed">
                                  <span className="text-amber-500 mt-0.5">•</span> {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {resume.aiAnalysis.missingSkills?.length > 0 && (
                          <div className="bg-white p-8 rounded-2xl border border-slate-200/60 shadow-sm relative overflow-hidden group hover:border-blue-200 transition-colors">
                            <div className="absolute top-0 left-0 w-full h-1.5 bg-blue-400"></div>
                            <h4 className="font-bold text-slate-900 mb-6 flex items-center gap-2.5">
                              <div className="p-2 bg-blue-100 rounded-lg text-blue-600"><Crosshair className="w-5 h-5" /></div>
                              Missing Skills
                            </h4>
                            <ul className="space-y-4">
                              {resume.aiAnalysis.missingSkills.map((item, idx) => (
                                <li key={idx} className="text-sm text-slate-600 font-medium flex items-start gap-3 leading-relaxed">
                                  <span className="text-blue-500 mt-0.5">•</span> {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  );
};

export default GenarateResume;