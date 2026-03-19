import React from 'react';
import { 
  Zap, 
  ShieldCheck, 
  Award, 
  TrendingUp, 
  Lightbulb, 
  CheckCircle,
  Eye,
  Users
} from 'lucide-react';
import logo from "../assets/PeakCV Logo.png"
import { useNavigate } from 'react-router-dom';

const AboutPage = () => {
    const navigate=useNavigate()
  return (
    <div className="min-h-screen bg-white font-sans text-slate-800">
      {/* Navigation */}
   

      {/* Hero Section */}
      <section className="text-center py-20 px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          About <span className="text-[#065f46]">ResumeAI</span>
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          We're on a mission to help job seekers create professional, ATS-friendly 
          resumes that get them noticed by recruiters and land their dream jobs.
        </p>
      </section>

      {/* Our Mission Section */}
      <section className="bg-[#f0fdf4] py-20 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6 text-[#064e3b]">Our Mission</h2>
            <p className="text-slate-600 mb-6 leading-relaxed">
              We believe that everyone deserves a chance to showcase their skills and experience 
              in the best possible way. That's why we created ResumeAI — an intelligent platform 
              that combines cutting-edge AI technology with proven resume best practices.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Our goal is to democratize access to professional resume writing services, 
              making it easy and affordable for anyone to create a standout resume 
              that opens doors to new opportunities.
            </p>
          </div>
          <div className="bg-gradient-to-br from-[#065f46] to-[#10b981] p-8 rounded-2xl text-white shadow-xl">
            <div className="flex gap-4 mb-8">
              <div className="bg-white/20 p-3 rounded-full h-fit">
                <Eye size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Our Vision</h3>
                <p className="text-emerald-50 text-sm">
                  To empower every job seeker with AI-powered tools that level the playing field.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="bg-white/20 p-3 rounded-full h-fit">
                <Users size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Our Community</h3>
                <p className="text-emerald-50 text-sm">
                  Join thousands of professionals who've successfully landed jobs using ResumeAI.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4 text-[#064e3b]">Why Choose ResumeAI?</h2>
          <p className="text-slate-600">We combine artificial intelligence with human expertise to deliver exceptional results.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: <Zap className="text-emerald-600" />, title: "AI-Powered", desc: "Advanced algorithms analyze job descriptions and optimize your resume for maximum impact." },
            { icon: <ShieldCheck className="text-emerald-600" />, title: "ATS-Friendly", desc: "All templates are designed to pass Applicant Tracking Systems used by 99% of companies." },
            { icon: <Award className="text-emerald-600" />, title: "Professional Quality", desc: "Designed by HR experts and recruiters who know what hiring managers look for." },
            { icon: <TrendingUp className="text-emerald-600" />, title: "Proven Results", desc: "Our users report 3x more interview callbacks compared to their old resumes." },
            { icon: <Lightbulb className="text-emerald-600" />, title: "Smart Suggestions", desc: "Get AI-powered content recommendations that highlight your achievements effectively." },
            { icon: <CheckCircle className="text-emerald-600" />, title: "Easy to Use", desc: "Create a professional resume in minutes with our intuitive step-by-step builder." }
          ].map((feature, index) => (
            <div key={index} className="p-8 bg-white border border-slate-100 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-emerald-50 rounded-lg flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="font-bold text-lg mb-3">{feature.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-y border-slate-100 bg-emerald-50/30">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-[#064e3b] mb-2">50,000+</div>
            <div className="text-slate-500 text-sm">Resumes Created</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-[#064e3b] mb-2">98%</div>
            <div className="text-slate-500 text-sm">User Satisfaction</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-[#064e3b] mb-2">3x</div>
            <div className="text-slate-500 text-sm">More Interviews</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-[#064e3b] mb-2">24/7</div>
            <div className="text-slate-500 text-sm">AI Assistance</div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 px-6 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8 text-[#064e3b]">Our Story</h2>
        <div className="text-slate-600 space-y-6 leading-relaxed text-left md:text-center">
          <p>
            ResumeAI was founded in 2024 by a team of software engineers, HR professionals, and career coaches 
            who were frustrated with the traditional resume-writing process. We saw too many talented individuals 
            struggle to translate their skills and experience into compelling resumes that get past automated 
            screening systems.
          </p>
          <p>
            After months of research, countless interviews with recruiters, and testing with job seekers, we 
            developed an AI-powered platform that combines the best of technology and human expertise. Our 
            system learns from millions of successful resumes to help you craft content that resonates with both 
            ATS systems and human recruiters.
          </p>
          <p>
            Today, ResumeAI helps thousands of professionals across industries create resumes that showcase 
            their unique value and help them stand out in competitive job markets. We're constantly improving our 
            platform based on user feedback and the latest hiring trends.
          </p>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="bg-slate-50 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-[#064e3b]">Our Values</h2>
            <p className="text-slate-500">These principles guide everything we do</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { title: "Accessibility", desc: "We believe professional resume tools should be accessible to everyone, regardless of their background or budget." },
              { title: "Innovation", desc: "We continuously push the boundaries of what's possible with AI to deliver cutting-edge features and improvements." },
              { title: "Quality", desc: "We're committed to delivering the highest quality resumes that meet professional standards and industry best practices." },
              { title: "Transparency", desc: "We're honest about how our AI works and what you can expect. No hidden fees, no misleading promises." }
            ].map((value, index) => (
              <div key={index} className="bg-white p-10 rounded-xl border border-slate-200">
                <h3 className="font-bold text-xl mb-4">{value.title}</h3>
                <p className="text-slate-600 leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 text-center bg-gradient-to-r from-[#064e3b] via-[#065f46] to-[#059669] text-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Ready to Build Your Future?</h2>
          <p className="mb-10 text-emerald-50">Join thousands of professionals who've successfully transformed their careers with ResumeAI.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-[#064e3b] font-bold px-8 py-4 rounded-lg hover:bg-emerald-50 transition-colors">
              Create Your Resume
            </button>
            <button className="bg-transparent border border-white/40 text-white font-bold px-8 py-4 rounded-lg hover:bg-white/10 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </section>
      
      {/* Footer Space */}
      <div className="h-20 bg-emerald-900/10"></div>
    </div>
  );
};

export default AboutPage;