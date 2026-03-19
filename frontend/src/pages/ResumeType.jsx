import React from 'react';
import { 
  FileText, 
  ChevronLeft, 
  FileEdit, 
  Upload 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';


const ResumeType = () => {
    const navigate=useNavigate()

    
  return (
    
    <div className="min-h-screen bg-[#E9FBF3] font-sans  text-[#1A4D3E]">
     

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 md:px-16 py-12 flex flex-col items-center">
        {/* Breadcrumb */}
        <div className="w-full max-w-5xl pt-16">
          <button className="flex items-center gap-1 text-gray-500 text-sm font-medium hover:text-[#0D4D3B] transition-colors">
            <ChevronLeft size={16} />
            Back to Templates
          </button>
        </div>

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-[#0D4D3B] mb-4">
            How would you like to start?
          </h1>
          <p className="text-gray-600 text-lg">
            Choose the method that works best for you
          </p>
        </div>

        {/* Choice Cards Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
          
          {/* Start from Scratch Card */}
          <div onClick={()=>{navigate("/create")}} className="bg-white rounded-[32px] p-10 border border-white shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer group flex flex-col items-start">
            <div className="w-16 h-16 bg-[#D1F7E8] rounded-full flex items-center justify-center mb-8">
              <FileEdit className="text-[#0D4D3B]" size={32} />
            </div>
            <h2  className="text-2xl font-bold text-[#1A4D3E] mb-4">
              Start from Scratch
            </h2>
            <p className="text-[#4A6D63] leading-relaxed mb-6">
              Build your resume step by step with AI assistance and smart suggestions to help you along the way.
            </p>
            <p className="text-[#0D4D3B] font-bold text-sm mt-auto">
              Recommended for most users
            </p>
          </div>

          {/* Import Existing Resume Card */}
          <div className="bg-white rounded-[32px] p-10 border border-white shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer group flex flex-col items-start">
            <div className="w-16 h-16 bg-[#0FB279] rounded-full flex items-center justify-center mb-8">
              <Upload className="text-white" size={32} />
            </div>
            <h2 className="text-2xl font-bold text-[#1A4D3E] mb-4">
              Import Existing Resume
            </h2>
            <p className="text-[#4A6D63] leading-relaxed mb-6">
              Upload your current resume and we'll help you improve it with our AI-powered suggestions and formatting.
            </p>
            <p className="text-gray-500 font-medium text-sm mt-auto">
              Save time with existing content
            </p>
          </div>

        </div>
      </main>
    </div>
  );
};

export default ResumeType;