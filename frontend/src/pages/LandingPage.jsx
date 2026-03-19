import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FileText, 
  Check, 
  Sparkles, 
  Zap, 
  ShieldCheck, 
  Star, 
  ArrowRight, 
  Layout, 
  Upload, 
  Download 
} from 'lucide-react';
import img1 from "../assets/WhatsApp Image 2026-03-17 at 2.34.18 PM.jpeg"
import img2 from  "../assets/WhatsApp Image 2026-03-17 at 2.34.30 PM.jpeg"
import img3 from "../assets/WhatsApp Image 2026-03-17 at 2.34.58 PM.jpeg"
import logo from "../assets/PeakCV Logo.png"

const LandingPage = () => {

    const navigate=useNavigate()
  return (
    <div className="min-h-screen font-sans text-[#1A4D3E] bg-white selection:bg-[#0FB279]/30 ">
 

      {/* Hero Section */}
      <section className="bg-[#E9FBF3] pt-16 md:pt-24 md:pb-32 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 text-center lg:text-left pt-12">
            <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] text-[#0D4D3B] mb-8">
              Build a <br /> Professional <br /> Resume in <br /> Minutes with AI.
            </h1>
            <p className="text-xl text-[#4A6D63] mb-10 max-w-lg mx-auto lg:mx-0">
              Create, customize, and optimize your resume effortlessly.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button onClick={()=>{navigate("/resume")}} className="bg-[#0D4D3B] text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center gap-2 hover:bg-[#0a3a2d] transition-all shadow-lg shadow-emerald-950/20 active:scale-95">
                <FileText size={20} />
                Create Resume
              </button>
              <button onClick={()=>{navigate("/import")}} className="bg-white text-[#0D4D3B] border border-gray-200 px-8 py-4 rounded-xl font-bold text-lg flex items-center gap-2 hover:bg-gray-50 transition-all active:scale-95">
                <Upload size={20} />
                Import Resume
              </button>
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
      <section className="py-24 px-6 bg-[#D1F7E8]/30">
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
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold text-[#0D4D3B] mb-4">How It Works</h2>
          <p className="text-[#4A6D63]">Create your perfect resume in 4 simple steps.</p>
        </div>
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { step: "1", title: "Choose a Template", desc: "Select from variety of professional designs." },
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

      {/* Resume Templates Section */}
      <section className="py-24 px-6 bg-[#D1F7E8]/30">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold text-[#0D4D3B] mb-4">Resume Templates</h2>
          <p className="text-[#4A6D63]">Modern designs for every industry.</p>
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {[
           
              { title: "Modern Professional", category: "Modern", image: img1 },
              { title: "Creative", category: "Creative Designer", image: img2 },
              { title: "Professional", category: "Executive Senior", image: img3 }
            
          ].map((item, i) => (
            <div key={i} className="group bg-white rounded-3xl overflow-hidden border border-white shadow-sm hover:shadow-xl transition-all cursor-pointer">
              <div className="aspect-[3/4] bg-gradient-to-br from-[#0FB279]/20 to-[#0FB279]/5 flex items-center justify-center">
                        <img  src={item.image} 
                      alt={item.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      </div>
                      <div className="p-6">
                <h3 className="font-bold text-lg">{item.category}</h3>
                <p className="text-sm text-gray-500">{item.title}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center">
          <button onClick={()=>navigate("/resume")} className="bg-white border border-[#0D4D3B] text-[#0D4D3B] px-8 py-3 rounded-xl font-bold hover:bg-[#0D4D3B] hover:text-white transition-all">
            View All Templates
          </button>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-24 px-6 bg-white">
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

      {/* Pricing Section */}
      <section className="py-24 px-6 bg-[#D1F7E8]/30">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold text-[#0D4D3B] mb-4">Simple Pricing</h2>
          <p className="text-[#4A6D63]">Choose the plan that works for you.</p>
        </div>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Free Plan */}
          <div className="bg-white p-10 rounded-[32px] border border-white shadow-sm flex flex-col">
            <div className="mb-8">
              <span className="text-gray-500 text-sm font-medium">Free</span>
              <div className="text-4xl font-bold text-[#1A4D3E] mt-2">$0</div>
            </div>
            <ul className="space-y-4 mb-10 flex-1">
              {['1 Resume', 'Basic Templates', 'PDF Export', 'Community Support'].map((feat, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-[#4A6D63]">
                  <Check size={16} className="text-[#0FB279]" /> {feat}
                </li>
              ))}
            </ul>
            <button className="w-full py-4 rounded-xl font-bold border border-gray-200 hover:bg-gray-50 transition-colors">Get Started</button>
          </div>

          {/* Pro Plan */}
          <div className="bg-white p-10 rounded-[32px] border-2 border-[#0D4D3B] shadow-xl relative flex flex-col scale-105 z-10">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#0D4D3B] text-white px-4 py-1 rounded-full text-xs font-bold">Most Popular</div>
            <div className="mb-8">
              <span className="text-gray-500 text-sm font-medium">Pro</span>
              <div className="text-4xl font-bold text-[#1A4D3E] mt-2">$12<span className="text-base font-normal text-gray-500">/month</span></div>
            </div>
            <ul className="space-y-4 mb-10 flex-1">
              {['Unlimited Resumes', 'All Pro Templates', 'AI Suggestions', 'Priority Download', 'Expert Feedback'].map((feat, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-[#4A6D63]">
                  <Check size={16} className="text-[#0FB279]" /> {feat}
                </li>
              ))}
            </ul>
            <button className="w-full py-4 rounded-xl font-bold bg-[#0D4D3B] text-white hover:bg-[#0a3a2d] transition-colors">Get Started</button>
          </div>

          {/* Enterprise Plan */}
          <div className="bg-white p-10 rounded-[32px] border border-white shadow-sm flex flex-col">
            <div className="mb-8">
              <span className="text-gray-500 text-sm font-medium">Enterprise</span>
              <div className="text-4xl font-bold text-[#1A4D3E] mt-2">$49<span className="text-base font-normal text-gray-500">/month</span></div>
            </div>
            <ul className="space-y-4 mb-10 flex-1">
              {['Every Single Pro', 'Team Collaboration', 'Custom Branding', 'API Access', 'Dedicated Account Manager'].map((feat, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-[#4A6D63]">
                  <Check size={16} className="text-[#0FB279]" /> {feat}
                </li>
              ))}
            </ul>
            <button className="w-full py-4 rounded-xl font-bold border border-gray-200 hover:bg-gray-50 transition-colors">Get Started</button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-24">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-[#0D4D3B] to-[#0FB279] rounded-[40px] p-12 md:p-20 text-center text-white relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-8 relative z-10">Start Building Your Resume Now</h2>
            <p className="text-xl opacity-90 mb-12 relative z-10">Join thousands of professionals who landed their dream jobs.</p>
            <button className="bg-white text-[#0D4D3B] px-10 py-5 rounded-2xl font-bold text-xl flex items-center gap-2 mx-auto hover:bg-gray-100 transition-all active:scale-95 shadow-xl relative z-10">
              Get Started Free <ArrowRight size={24} />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 py-20 px-6">
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
                <li><a href="#" className="hover:text-[#0D4D3B]">Pricing</a></li>
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