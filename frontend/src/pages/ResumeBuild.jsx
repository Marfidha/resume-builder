import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FileText, 
  ChevronLeft, 
  Search
} from 'lucide-react';
import img1 from "../assets/WhatsApp Image 2026-03-17 at 2.34.18 PM.jpeg"
import img2 from  "../assets/WhatsApp Image 2026-03-17 at 2.34.30 PM.jpeg"
import img3 from "../assets/WhatsApp Image 2026-03-17 at 2.34.58 PM.jpeg"
import img4 from "../assets/WhatsApp Image 2026-03-18 at 11.13.57 AM.jpeg"
import logo from "../assets/PeakCV Logo.png"

const ResumeBuild= () => {
    const navigate=useNavigate()
  const [activeFilter, setActiveFilter] = useState('All');

  


  const filters = ['All', 'Modern', 'Creative', 'Professional', 'Minimal'];
  

 const templates = [
  { id: 1, title: 'Modern Professional', desc: 'Clean and contemporary design', tag: 'Modern', image: img1, tagColor: 'bg-[#0FB279]' },
  { id: 2, title: 'Creative Designer', desc: 'Stand out with bold styling', tag: 'Creative', image: img2, tagColor: 'bg-[#0FB279]' },
  { id: 3, title: 'Executive Leader', desc: 'Traditional and refined', tag: 'Professional', image: img3, tagColor: 'bg-[#0FB279]' },
  { id: 4, title: 'Minimal Tech', desc: 'Simple and focused', tag: 'Minimal', image: img4, tagColor: 'bg-[#0FB279]' },
];

  const filteredTemplates =
  activeFilter === "All"
    ? templates
    : templates.filter((t) => t.tag === activeFilter);


  return (
    <div className="min-h-screen bg-[#E9FBF3] font-sans text-[#1A4D3E]">


      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 pt-24 py-8">
        {/* Breadcrumb */}
        <button  onClick={() => navigate(-1)}className="flex items-center gap-1 text-gray-500 text-sm font-medium hover:text-[#0D4D3B] mb-8 transition-colors">
          <ChevronLeft size={16} />
          Back to Home
        </button>

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-[#0D4D3B] mb-4">Choose Your Template</h1>
          <p className="text-gray-600 text-lg">Select a design that matches your style and industry</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-12">
         {filters.map((filter) => (
            <button
                key={filter}
                onClick={() => navigate(`/type/${filter.id}`)}
                className={`px-6 py-2 rounded-lg font-semibold text-sm ${
                activeFilter === filter
                    ? 'bg-[#0D4D3B] text-white'
                    : 'bg-[#0FB279] text-white hover:bg-[#0da06d]'
                }`}
            >
                {filter}
            </button>
            ))}
        </div>

        {/* Template Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {filteredTemplates.map((template) => (
            <div 
              key={template.id} 
              className="group bg-white rounded-[24px] overflow-hidden border border-white shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col"
            >
              {/* Preview Area */}
              <div className="aspect-[3/4] bg-gradient-to-br from-[#0FB279]/20 to-[#0FB279]/5 flex items-center justify-center relative overflow-hidden">
                <img
                  src={template.image}
                  alt={template.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-[#0D4D3B]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button onClick={() => navigate(`/type/${template.id}`)}
                  className="bg-white text-[#0D4D3B] px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform">
                    Use Template
                  </button>
                </div>
              </div>

              {/* Details Area */}
              <div className="p-6 flex flex-col flex-1">
                <h3 className="font-bold text-[#1A4D3E] text-lg mb-1">{template.title}</h3>
                <p className="text-xs text-gray-500 mb-4 leading-relaxed">{template.desc}</p>
                <div className="mt-auto">
                  <span className={`inline-block px-3 py-1 rounded text-[10px] font-bold text-white uppercase tracking-wider ${template.tagColor}`}>
                    {template.tag}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ResumeBuild;