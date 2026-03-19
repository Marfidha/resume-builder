import React from 'react';
import { 
  ChevronLeft, 
  RotateCcw, 
  Save, 
  GripVertical, 
  CheckCircle2, 
  Sparkles, 
  MousePointer2,
  ExternalLink
} from 'lucide-react';


const ResumeEditpage = () => {
  const sections = [
    { name: 'Personal Info', completed: true },
    { name: 'Summary', completed: true },
    { name: 'Experience', completed: true },
    { name: 'Education', completed: true },
    { name: 'Skills', completed: true },
    { name: 'Certifications', completed: true },
    { name: 'Achievements', completed: true },
    { name: 'Projects', completed: true },
  ];

  return (
    <>
    <div className="min-h-screen bg-[#f8fafc] font-sans text-slate-900 ">


      {/* Action Bar */}
      <div className="bg-white border-b border-t border-slate-200 py-3 px-6 pt-24 ">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between ">
          <button className="flex items-center  gap-2 text-slate-600 hover:text-slate-900 transition-colors text-sm font-medium">
            <ChevronLeft size={18} />
            Back to Preview
          </button>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-50 text-sm font-medium transition-colors">
              <RotateCcw size={16} />
              Change Template
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-[#10b981] text-white rounded-lg hover:bg-[#059669] text-sm font-medium transition-colors shadow-sm">
              <Save size={16} />
              Save & Continue
            </button>
          </div>
        </div>
      </div>

      <main className="max-w-[1200px] mx-auto px-6 py-8 flex gap-8">
        {/* Sidebar */}
        <aside className="w-64 flex-shrink-0">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm sticky top-32">
            <div className="flex items-center gap-2 mb-6 text-slate-700">
              <span className="font-bold text-sm tracking-wide uppercase flex items-center gap-2">
                <span className="text-lg">T</span> Resume Sections
              </span>
            </div>
            
            <div className="space-y-1">
              {sections.map((section, idx) => (
                <div 
                  key={idx} 
                  className="group flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <GripVertical size={14} className="text-slate-300 group-hover:text-slate-400" />
                    <span className="text-sm font-medium text-slate-600">{section.name}</span>
                  </div>
                  {section.completed && <CheckCircle2 size={16} className="text-[#065f46]" />}
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Quick Tips</h4>
              <ul className="space-y-3">
                <li className="flex gap-2 text-[11px] text-slate-500 items-start">
                  <Sparkles size={12} className="mt-0.5 text-emerald-500 shrink-0" />
                  Click any text to edit directly
                </li>
                <li className="flex gap-2 text-[11px] text-slate-500 items-start">
                  <MousePointer2 size={12} className="mt-0.5 text-emerald-500 shrink-0" />
                  Select text for AI suggestions
                </li>
                <li className="flex gap-2 text-[11px] text-slate-500 items-start">
                  <GripVertical size={12} className="mt-0.5 text-emerald-500 shrink-0" />
                  Drag sections to reorder
                </li>
              </ul>
            </div>
          </div>
        </aside>

        {/* Resume Preview */}
        <div className="flex-grow flex flex-col items-center">
          <div className="w-full bg-white rounded-2xl shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] border border-slate-200 p-12 min-h-[1000px]">
            {/* Resume Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">Sarah Johnson</h1>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-slate-500 text-sm">
                <span>sarah.johnson@email.com</span>
                <span>|</span>
                <span>+1 (555) 234-5678</span>
                <span>|</span>
                <span>San Francisco, CA</span>
              </div>
              <div className="flex gap-x-4 mt-1 text-slate-500 text-sm">
                <a href="#" className="hover:underline">linkedin.com/in/sarahjohnson</a>
                <span>•</span>
                <a href="#" className="hover:underline">sarahjohnson.dev</a>
              </div>
            </div>

            <hr className="border-slate-800 border-[1.5px] mb-8" />

            {/* Professional Summary */}
            <section className="mb-8">
              <h2 className="text-lg font-bold text-slate-900 uppercase tracking-wider mb-3">Professional Summary</h2>
              <p className="text-slate-600 leading-relaxed text-[15px]">
                Results-driven Software Engineer with 5+ years of experience building scalable web applications. 
                Expertise in React, Node.js, and cloud technologies. Passionate about creating innovative 
                solutions that drive business growth and enhance user experiences.
              </p>
            </section>

            {/* Work Experience */}
            <section className="mb-8">
              <h2 className="text-lg font-bold text-slate-900 uppercase tracking-wider mb-4">Work Experience</h2>
              <div className="mb-6">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-[16px] text-slate-800">Senior Software Engineer</h3>
                  <span className="text-slate-500 text-xs">Jan 2022 - Present</span>
                </div>
                <div className="text-slate-700 font-medium text-sm mb-2">TechCorp • San Francisco, CA</div>
                <ul className="list-disc pl-4 space-y-1.5 text-slate-600 text-[14.5px]">
                  <li>Led development of new features that increased user engagement by 40%</li>
                  <li>Mentored 5 junior engineers and conducted code reviews</li>
                  <li>Architected scalable microservices handling 1M+ requests/day</li>
                  <li>Reduced application load time by 60% through optimization</li>
                </ul>
              </div>
            </section>

            {/* Education */}
            <section className="mb-8">
              <h2 className="text-lg font-bold text-slate-900 uppercase tracking-wider mb-4">Education</h2>
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="font-bold text-[16px] text-slate-800">Bachelor of Science in Computer Science</h3>
                <span className="text-slate-500 text-xs">May 2019</span>
              </div>
              <div className="flex justify-between items-baseline">
                <div className="text-slate-700 font-medium text-sm">Stanford University • Stanford, CA</div>
                <span className="text-slate-500 text-xs italic">GPA: 3.8/4.0</span>
              </div>
            </section>

            {/* Skills */}
            <section className="mb-8">
              <h2 className="text-lg font-bold text-slate-900 uppercase tracking-wider mb-3">Skills</h2>
              <p className="text-slate-600 text-[14.5px] leading-loose">
                JavaScript • TypeScript • React • Node.js • Python • AWS • Docker • Kubernetes • PostgreSQL • MongoDB • Git • Agile/Scrum
              </p>
            </section>

            {/* Certifications */}
            <section className="mb-8">
              <h2 className="text-lg font-bold text-slate-900 uppercase tracking-wider mb-4">Certifications</h2>
              <div className="flex justify-between items-baseline">
                <div>
                  <h3 className="font-bold text-[15px] text-slate-800">AWS Certified Solutions Architect</h3>
                  <p className="text-slate-500 text-sm italic">Amazon Web Services</p>
                </div>
                <span className="text-slate-500 text-xs">March 2024</span>
              </div>
            </section>

            {/* Achievements */}
            <section className="mb-8">
              <h2 className="text-lg font-bold text-slate-900 uppercase tracking-wider mb-3">Achievements</h2>
              <ul className="list-disc pl-4 space-y-2 text-slate-600 text-[14.5px]">
                <li>Won Best Innovation Award at company hackathon 2024</li>
                <li>Published article on React performance optimization with 50K+ views</li>
                <li>Increased team productivity by 30% through process improvements</li>
              </ul>
            </section>

            {/* Projects */}
            <section className="mb-8">
              <h2 className="text-lg font-bold text-slate-900 uppercase tracking-wider mb-4">Projects</h2>
              <div className="mb-2">
                <h3 className="font-bold text-[16px] text-slate-800">E-commerce Platform</h3>
                <p className="text-slate-600 text-[14.5px] leading-relaxed mt-1">
                  Built a full-stack e-commerce platform with real-time inventory management, payment processing, 
                  and analytics dashboard. Serves 10,000+ daily active users.
                </p>
                <div className="mt-2 text-[13px]">
                  <span className="font-bold text-slate-700">Technologies: </span>
                  <span className="text-slate-600">React, Node.js, MongoDB, Stripe API, AWS</span>
                </div>
                <a href="#" className="text-sky-600 text-xs flex items-center gap-1 mt-1 hover:underline">
                  https://github.com/sarahjohnson/ecommerce
                  <ExternalLink size={10} />
                </a>
              </div>
            </section>
          </div>

          {/* Bottom hint */}
          <div className="mt-8 flex items-center gap-6 text-slate-500 text-sm">
            <div className="flex items-center gap-2">
              <Sparkles size={14} className="text-[#10b981]" />
              Click any text to edit
            </div>
            <div className="w-1 h-1 bg-slate-300 rounded-full"></div>
            <div className="flex items-center gap-2">
              <MousePointer2 size={14} className="text-[#10b981]" />
              Select text for AI suggestions
            </div>
            <div className="w-1 h-1 bg-slate-300 rounded-full"></div>
            <span>Changes save automatically</span>
          </div>
        </div>
      </main>
    </div>
    </>
  );
};

export default ResumeEditpage;