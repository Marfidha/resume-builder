import React, { useState } from 'react';
import { 
  Upload, 
  Info, 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle2, 
  FileText
} from 'lucide-react';
import logo from "../assets/PeakCV Logo.png"

const ImportResume = () => {
  const [selectedTemplate, setSelectedTemplate] = useState('Modern Professional');

  const templates = [
    { name: 'Modern Professional', style: 'Modern', desc: 'Clean and contemporary design' },
    { name: 'Creative Designer', style: 'Creative', desc: 'Stand out with bold styling' },
    { name: 'Executive Leader', style: 'Professional', desc: 'Traditional and refined' },
    { name: 'Minimal Tech', style: 'Minimal', desc: 'Simple and focused' },
    { name: 'Elegant Classic', style: 'Professional', desc: 'Timeless and sophisticated' },
    { name: 'Bold Innovator', style: 'Creative', desc: 'Make a strong impression' },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans text-slate-800 pb-12">
      

      {/* Main Content Area */}
      <div className="max-w-[850px] mx-auto px-4 mt-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-slate-900 mb-3">Import Your Resume</h1>
          <p className="text-slate-500">Upload your existing resume and we'll extract the information for you</p>
        </div>

        {/* Section 1: Upload Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mb-8">
          <div className="border-2 border-dashed border-slate-200 rounded-xl p-12 text-center bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer group">
            <div className="w-16 h-16 bg-white rounded-xl shadow-sm flex items-center justify-center mx-auto mb-4 border border-slate-100 group-hover:scale-110 transition-transform">
              <Upload className="text-emerald-600" size={32} />
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-1">Drop your resume here</h3>
            <p className="text-sm text-slate-500 mb-4">or click to browse from your computer</p>
            <p className="text-[11px] text-slate-400 font-medium">Supports PDF, DOC, DOCX • Max size 5MB</p>
          </div>

          {/* Info Box */}
          <div className="mt-8 bg-[#eff6ff] rounded-xl p-6 border border-blue-100">
            <div className="flex gap-3">
              <Info size={20} className="text-blue-600 shrink-0" />
              <div>
                <h4 className="text-sm font-bold text-blue-900 mb-3">What happens next?</h4>
                <ol className="space-y-2">
                  {[
                    "We'll extract information from your resume using AI",
                    "You can review and edit all the extracted details",
                    "Choose from our professional templates",
                    "Download your beautifully formatted resume"
                  ].map((step, i) => (
                    <li key={i} className="flex gap-2 text-sm text-blue-800 font-medium leading-tight">
                      <span className="text-blue-400">{i + 1}.</span> {step}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Template Selection */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
          <div className="mb-8">
            <h2 className="text-xl font-bold text-slate-900 mb-1">Choose Your Template</h2>
            <p className="text-sm text-slate-500">Select a design that matches your style and industry</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((tpl, idx) => {
              const isSelected = selectedTemplate === tpl.name;
              return (
                <div 
                  key={idx}
                  onClick={() => setSelectedTemplate(tpl.name)}
                  className={`relative group cursor-pointer transition-all duration-300 rounded-xl overflow-hidden border-2 ${
                    isSelected ? 'border-emerald-600 ring-4 ring-emerald-50' : 'border-slate-100 hover:border-slate-300'
                  }`}
                >
                  {/* Template Preview (Placeholder Image) */}
                  <div className="aspect-[3/4] bg-gradient-to-br from-emerald-200 to-emerald-400 flex items-center justify-center p-8">
                    <div className="w-full h-full bg-white/20 rounded-lg flex items-center justify-center border border-white/30">
                      <FileText size={48} className="text-white/60" />
                    </div>
                  </div>

                  {/* Selection Checkmark */}
                  {isSelected && (
                    <div className="absolute top-3 right-3 z-10">
                      <div className="bg-[#064e3b] text-white rounded-full p-0.5 border-2 border-white shadow-sm">
                        <CheckCircle2 size={16} />
                      </div>
                    </div>
                  )}

                  {/* Card Info */}
                  <div className="p-4 bg-white border-t border-slate-100">
                    <h3 className="text-sm font-bold text-slate-800">{tpl.name}</h3>
                    <p className="text-[11px] text-slate-500 font-medium mb-1">{tpl.style}</p>
                    <p className="text-[10px] text-slate-400 leading-tight">{tpl.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="mt-10 flex items-center justify-between">
          <button className="px-6 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-lg text-sm font-bold hover:bg-slate-50 transition-colors shadow-sm">
            Back
          </button>
          <button className="flex items-center gap-2 px-8 py-2.5 bg-gradient-to-r from-emerald-500 to-[#10b981] text-white rounded-lg text-sm font-bold hover:shadow-lg transition-all shadow-md group">
            Continue
            <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImportResume;