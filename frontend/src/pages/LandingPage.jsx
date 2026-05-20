import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FileText, Check, Sparkles, Zap, ShieldCheck, Star, ArrowRight, Layout, Upload, Download, Lock} from 'lucide-react';
import { useUser, useAuth } from "@clerk/react";
import API_BASE_URL from "../config/api.js";

const LandingPage = () => {
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const [toastMessage, setToastMessage] = useState("");
  const [hasResume, setHasResume] = useState(false);
  const [resumeId, setResumeId] = useState(null);
  const { isSignedIn } = useUser();
  const { getToken } = useAuth();

  useEffect(() => {
    const checkUserResume = async () => {
      
      if (isSignedIn) {
        try {
          const res = await axios.get(`${API_BASE_URL}/api/resumes/me`);
          if (res.data && res.data._id) {
            setHasResume(true);
            setResumeId(res.data._id);
          }
        } catch (error) {
          console.log("No existing resume found or error fetching:", error.message);
        }
      }
    };
    checkUserResume();
  }, []);

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage("");
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const handleAuthCheck = () => {
    
  if (!isSignedIn) {
    setToastMessage("Please login to continue");
    return false;
  }
  return true;
  };

  const handleFileChange = async (e) => {
    const token = await getToken();
    const file = e.target.files[0];
    if (file) {
      console.log("Selected file:", file.name);

      const formData = new FormData();
      formData.append('resume', file);

      try {
        const response = await axios.post(`${API_BASE_URL}/api/upload/`, formData,{
      headers: {
         Authorization: `Bearer ${token}`,
      },
   });
        if (response.data.id) {
          navigate(`/resume/${response.data.id}`);
        } else {
          alert(response.data.message || `Successfully uploaded: ${file.name}`);
        }
      } catch (error) {
        console.error("Error uploading file:", error);
        alert("Error uploading PDF");
      }

      // Clear the input value so the same file can be selected again
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="min-h-screen font-sans text-[#1A4D3E] bg-white selection:bg-[#0FB279]/30 ">

      {/* Toast Message */}
      {toastMessage && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-[#1A4D3E] text-white px-6 py-3.5 rounded-xl shadow-2xl z-50 animate-in slide-in-from-bottom-5 fade-in duration-300 border border-[#0D4D3B]">
          <p className="font-medium text-sm flex items-center gap-2">
            <Lock size={16} />
            {toastMessage}
          </p>
        </div>
      )}

      {/* Hero Section */}
      <section className="bg-[#E9FBF3] pt-16 md:pt-24 md:pb-32 px-8 md:px-16 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 text-center lg:text-left pt-12">
            <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] text-[#0D4D3B] mb-8">
              Build a <br /> Professional <br /> Resume in <br /> Minutes with AI.
            </h1>
            <p className="text-xl text-[#4A6D63] mb-10 max-w-lg mx-auto lg:mx-0">
              Create, customize, and optimize your resume effortlessly.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              {!hasResume ? (
                <>
                  <button onClick={() => { if (handleAuthCheck()) navigate("/type/new") }} className="bg-[#0D4D3B] text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center gap-2 hover:bg-[#0a3a2d] transition-all shadow-lg shadow-emerald-950/20 active:scale-95">
                    <FileText size={20} />
                    Create Resume
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept=".pdf"
                    onChange={handleFileChange}
                  />
                  <button onClick={() => { if (handleAuthCheck()) fileInputRef.current?.click() }} className="bg-white text-[#0D4D3B] border border-gray-200 px-8 py-4 rounded-xl font-bold text-lg flex items-center gap-2 hover:bg-gray-50 transition-all active:scale-95">
                    <Upload size={20} />
                    Import Resume
                  </button>
                </>
              ) : (
                <>
                  <button onClick={() => navigate(`/resume/${resumeId}`)} className="bg-[#0D4D3B] text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center gap-2 hover:bg-[#0a3a2d] transition-all shadow-lg shadow-emerald-950/20 active:scale-95">
                    <FileText size={20} />
                    View Resume
                  </button>
                  {/* <button onClick={() => navigate(`/edit/${resumeId}`)} className="bg-white text-[#0D4D3B] border border-[#0D4D3B] px-8 py-4 rounded-xl font-bold text-lg flex items-center gap-2 hover:bg-gray-50 transition-all active:scale-95">
                    <Layout size={20} />
                    Edit Resume
                  </button> */}
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept=".pdf"
                    onChange={handleFileChange}
                  />
                  <button onClick={() => fileInputRef.current?.click()} className="bg-white text-[#0D4D3B] border border-gray-200 px-8 py-4 rounded-xl font-bold text-lg flex items-center gap-2 hover:bg-gray-50 transition-all active:scale-95">
                    <Upload size={20} />
                    Re-import Resume
                  </button>
                </>
              )}
            </div>
          </div>
          <div className="flex-1 relative">
            <div className="bg-white p-4 rounded-3xl shadow-2xl relative z-10">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800"
                alt="Team working"
                className="rounded-2xl w-full h-auto object-cover"
              />
            </div>
            {/* Decorative background blur */}
            <div className="absolute -top-10 -right-10 w-72 h-72 bg-[#0FB279] rounded-full blur-[100px] opacity-20"></div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-24 px-8 md:px-16 bg-[#D1F7E8]/30">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold text-[#0D4D3B] mb-4">Key Features</h2>
          <p className="text-[#4A6D63]">Everything you need to create a winning resume.</p>
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: <Sparkles />, title: "AI-Powered Suggestions", desc: "Get intelligent recommendations for skills, keywords, and wording to make your resume stand out." },
            { icon: <Zap />, title: "Real-Time Editing", desc: "Personalize your resume effortlessly with our intuitive real-time editing interface." },
            { icon: <ShieldCheck />, title: "ATS-Friendly", desc: "Optimize your resume for Tracking Systems (ATS) to increase your hiring and interview rates." }
          ].map((feature, i) => (
            <div key={i} className="bg-white p-8 rounded-[32px] border border-white shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-[#E9FBF3] rounded-full flex items-center justify-center text-[#0D4D3B] mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-[#4A6D63] leading-relaxed text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 px-8 md:px-16 bg-white">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold text-[#0D4D3B] mb-4">How It Works</h2>
          <p className="text-[#4A6D63]">Create your perfect resume in 4 simple steps.</p>
        </div>
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { step: "1", title: "Start Your Resume", desc: "Begin creating your professional resume." },
            { step: "2", title: "Add Your Details", desc: "Fill in your details in minutes." },
            { step: "3", title: "Get AI Suggestions", desc: "Fine-tune your resume with AI suggestions." },
            { step: "4", title: "Done! Reach It", desc: "Export your resume in PDF format." }
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center text-center group">
              <div className="w-12 h-12 bg-[#0D4D3B] text-white rounded-full flex items-center justify-center font-bold mb-6 transition-transform group-hover:scale-110">
                {item.step}
              </div>
              <h3 className="font-bold mb-2">{item.title}</h3>
              <p className="text-xs text-[#4A6D63]">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>



      {/* Success Stories Section */}
      <section className="py-24 px-8 md:px-16 bg-white">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold text-[#0D4D3B] mb-4">Success Stories</h2>
          <p className="text-[#4A6D63]">Hear from people who landed their dream jobs.</p>
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: "Jessica Chen", role: "UX Designer", text: "The AI suggestions were incredibly helpful. It felt like having a personal resume coach at my side." },
            { name: "Michael Stone", role: "Product Manager", text: "Clean and modern designs. I was able to customize my resume easily in under 20 minutes." },
            { name: "Emily Rodriquez", role: "Marketing Director", text: "The templates are top-notch and the ATS optimization gave me the confidence I needed." }
          ].map((testimonial, i) => (
            <div key={i} className="p-8 bg-white border border-gray-100 rounded-[32px] shadow-sm">
              <div className="flex text-yellow-400 mb-6">
                {[...Array(5)].map((_, j) => <Star key={j} size={16} fill="currentColor" />)}
              </div>
              <p className="text-[#4A6D63] italic mb-8">"{testimonial.text}"</p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                <div>
                  <h4 className="font-bold text-sm">{testimonial.name}</h4>
                  <p className="text-xs text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* CTA Section */}
      <section className="px-8 md:px-16 py-24">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-[#0D4D3B] to-[#0FB279] rounded-[40px] p-12 md:p-20 text-center text-white relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>

            <h2 className="text-4xl md:text-5xl font-bold mb-8 relative z-10">Start Building Your Resume Now</h2>
            <p className="text-xl opacity-90 mb-12 relative z-10">Join thousands of professionals who landed their dream jobs.</p>
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="bg-white text-[#0D4D3B] px-10 py-5 rounded-2xl font-bold text-xl flex items-center gap-2 mx-auto hover:bg-gray-100 transition-all active:scale-95 shadow-xl relative z-10"
            >
              Get Started Free <ArrowRight size={24} />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 py-20 px-8 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-12 mb-20">
            <div className="col-span-2 lg:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <FileText className="text-[#0D4D3B]" size={24} />
                <span className="text-xl font-bold tracking-tight">ResumeAI</span>
              </div>
              <p className="text-[#4A6D63] text-sm leading-relaxed">
                Empowering your career path with AI-driven tools.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-6">Product</h4>
              <ul className="space-y-4 text-sm text-gray-500">
                <li><a href="#" className="hover:text-[#0D4D3B]">Features</a></li>
                <li><a href="#" className="hover:text-[#0D4D3B]">Templates</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6">Company</h4>
              <ul className="space-y-4 text-sm text-gray-500">
                <li><a href="#" className="hover:text-[#0D4D3B]">About</a></li>
                <li><a href="#" className="hover:text-[#0D4D3B]">Blog</a></li>
                <li><a href="#" className="hover:text-[#0D4D3B]">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6">Legal</h4>
              <ul className="space-y-4 text-sm text-gray-500">
                <li><a href="#" className="hover:text-[#0D4D3B]">Privacy</a></li>
                <li><a href="#" className="hover:text-[#0D4D3B]">Terms</a></li>
                <li><a href="#" className="hover:text-[#0D4D3B]">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-500 font-medium">© 2026 ResumeAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;