import React, { useState, useEffect, useRef } from 'react';
import { 
  FileText, 
  Download, 
  Edit3, 
  CheckCircle, 
  ChevronLeft, 
  Sparkles, 
  Check, 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  Globe 
} from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import html2pdf from 'html2pdf.js';
import { PDFDownloadLink } from '@react-pdf/renderer';
import ResumePDF from './ResumePDF';


const GenarateResume = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const [resume, setResume] = useState(null);
  const resumeContentRef = useRef(null);

useEffect(() => {
  if (!id) return;

  const fetchResume = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/resumes/${id}`);
      setResume(res.data);
    } catch (err) {
      console.error("Error fetching resume:", err);
    }
  };

  fetchResume();
}, [id]);

 
const handleDownloadPDF = async () => {
  const element = document.getElementById("pdf-content");
  if (!element) return;

  setIsDownloading(true);

  // 🔥 Create clean iframe (no Tailwind)
  const iframe = document.createElement("iframe");
  iframe.style.position = "absolute";
  iframe.style.left = "-9999px";
  document.body.appendChild(iframe);

  const doc = iframe.contentDocument || iframe.contentWindow.document;

  // 🔥 Write CLEAN HTML (no Tailwind, no oklch)
  doc.open();
  doc.write(`
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 20px;
            color: #000;
            background: #fff;
          }
          h1 { font-size: 24px; margin-bottom: 10px; }
          h2 { font-size: 14px; margin-top: 20px; text-transform: uppercase; }
          p { font-size: 12px; line-height: 1.5; }
        </style>
      </head>
      <body>
        ${element.innerHTML}
      </body>
    </html>
  `);
  doc.close();

  const opt = {
    margin: 0.5,
    filename: "resume.pdf",
    html2canvas: {
      scale: 2,
    },
    jsPDF: {
      unit: "in",
      format: "a4",
      orientation: "portrait",
    },
  };

  try {
    await html2pdf().set(opt).from(doc.body).save();
    setDownloadSuccess(true);
  } catch (err) {
    console.error("PDF Error:", err);
  } finally {
    setIsDownloading(false);
    document.body.removeChild(iframe);
  }
};
  const handleEditResume = () => {
    navigate(`/edit/${id}`);
  };

  if (!resume) return (
    <div className="min-h-screen bg-[#F0FAF5] flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#103E33] mx-auto"></div>
        <p className="mt-4 text-[#103E33] font-medium">Loading your resume...</p>
      </div>
    </div>
  );

  return (
    
    <div  className="min-h-screen bg-[#F0FAF5] font-sans text-slate-800">
     

      <main className="max-w-7xl mx-auto px-4 py-8 md:px-12 pt-24">
        {/* Back to Editor Link */}
        <div 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-1 text-slate-500 mb-6 cursor-pointer hover:text-slate-800 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Back to Editor</span>
        </div>

        {/* Success Alert Banner */}
        <div className="bg-[#0D9488] text-white rounded-xl p-6 mb-8 flex items-start gap-4 shadow-sm">
          <div className="bg-white/20 p-2 rounded-lg mt-1">
            <CheckCircle className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Resume Generated Successfully!</h2>
            <p className="text-white/90 text-sm md:text-base">
              Your professional resume is ready. Download it now or make edits.
            </p>
          </div>
        </div>

        {/* Download Success Toast */}
        {downloadSuccess && (
          <div className="fixed top-24 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 z-50 animate-slideIn">
            <Check className="w-5 h-5" />
            <span>PDF downloaded successfully!</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Sidebar Section */}
          <aside className="lg:col-span-3 space-y-6">
            {/* Actions Card */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
              <h3 className="font-bold mb-4 text-slate-900">Actions</h3>
              <div className="space-y-3">
               <PDFDownloadLink
              document={<ResumePDF resume={resume} />}
              fileName="resume.pdf"
              className="w-full bg-[#0D9488] text-white py-3 rounded-lg flex items-center justify-center font-semibold"
            >
              {({ loading }) =>
                loading ? (
                  <span>Generating PDF...</span>
                ) : (
                  <>
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF
                  </>
                )
              }
            </PDFDownloadLink>
                <button 
                  onClick={handleEditResume}
                  className="w-full border border-slate-200 text-slate-700 py-3 rounded-lg flex items-center justify-center gap-2 font-semibold hover:bg-slate-50 transition-colors"
                >
                  <Edit3 className="w-4 h-4" />
                  Edit Resume
                </button>
              </div>

              {/* Tips Section */}
              <div className="mt-8">
                <h4 className="font-bold text-sm text-slate-900 mb-4">Resume Tips</h4>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <Sparkles className="w-4 h-4 text-[#0D9488] shrink-0 mt-0.5" />
                    <p className="text-xs text-slate-600 leading-relaxed">Keep your resume to 1-2 pages</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <Sparkles className="w-4 h-4 text-[#0D9488] shrink-0 mt-0.5" />
                    <p className="text-xs text-slate-600 leading-relaxed">Use action verbs and quantify achievements</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <Sparkles className="w-4 h-4 text-[#0D9488] shrink-0 mt-0.5" />
                    <p className="text-xs text-slate-600 leading-relaxed">Tailor your resume for each job application</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <Sparkles className="w-4 h-4 text-[#0D9488] shrink-0 mt-0.5" />
                    <p className="text-xs text-slate-600 leading-relaxed">Proofread carefully for any errors</p>
                  </li>
                </ul>
              </div>

              {/* Stats Section */}
              <div className="mt-8 pt-6 border-t border-slate-100">
                <h4 className="font-bold text-sm text-slate-900 mb-4">Resume Stats</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">Sections:</span>
                    <span className="font-bold">{
                      Object.values(resume).filter(value => 
                        value && typeof value === 'object' && Object.keys(value).length > 0
                      ).length
                    }</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">Completeness:</span>
                    <span className="font-bold text-[#0D9488]">88%</span>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Resume Preview Section */}
          <div className="lg:col-span-9 bg-white rounded-xl shadow-sm border border-slate-100 p-8 md:p-12">
            <div className="flex justify-between items-center mb-12">
              <h3 className="text-xl font-bold text-slate-900">Resume Preview</h3>
              <div className="text-[10px] text-slate-400 font-medium tracking-wider uppercase">
                A4 Format • Professional Layout
              </div>
            </div>

            {/* Actual Resume Content - with ref for PDF generation */}
            <div 
               ref={resumeContentRef}
                id="pdf-content"
              className="max-w-4xl mx-auto text-slate-800"
            >
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
            </div>
          </div>
        </div>
      </main>

      <style>{`
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  .animate-slideIn {
    animation: slideIn 0.3s ease-out;
  }
`}</style>
    </div>
  );
};

export default GenarateResume;