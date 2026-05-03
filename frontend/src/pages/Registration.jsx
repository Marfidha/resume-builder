import React, { useState } from 'react';
import { Check, User, Mail, Lock, Eye, EyeOff, FileText, Github } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from "../assets/PeakCV Logo.png"


const Registration = () => {
    const navigate=useNavigate()
  const [showPassword, setShowPassword] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

   const handleRegister = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.post(
      "http://localhost:5000/api/auth/register",
      { name, email, password }
    );

    const data = res.data;

    alert("Account created successfully ✅");

    localStorage.setItem("token", data.token);

    window.location.href = "/login";

  } catch (error) {
    console.error(error);

    if (error.response) {
      alert(error.response.data.message);
    } else {
      alert("Server not running or network error ❌");
    }
  }
};

  const features = [
    "AI-powered resume suggestions",
    "Professional templates",
    "ATS-friendly formatting",
    "Unlimited downloads",
    "Real-time preview",
    "Export to PDF"
  ];
  return (
      <div className="min-h-screen bg-[#E9FBF3] font-sans text-[#1A4D3E]">
      {/* Navigation */}
    

      <main className="max-w-7xl mx-auto px-8 md:px-16 py-12 md:py-20 flex flex-col lg:flex-row items-start justify-between gap-12">
        {/* Left Content */}
        <div className="flex-1 max-w-xl">
          <div className="w-12 h-12 bg-white/50 rounded-full flex items-center justify-center mb-8">
             <FileText className="text-[#0D4D3B]" size={24} />
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold leading-[1.1] mb-6 text-[#0D4D3B]">
            Start Building Your Future Today
          </h1>
          
          <p className="text-lg text-[#4A6D63] mb-10 leading-relaxed">
            Join thousands of professionals who have landed their dream jobs with our AI-powered resume builder.
          </p>

          <div className="space-y-4 mb-12">
            {features.map((feature, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-white/80 flex items-center justify-center">
                  <Check className="text-[#0D4D3B]" size={14} strokeWidth={3} />
                </div>
                <span className="text-[#1A4D3E] font-medium">{feature}</span>
              </div>
            ))}
          </div>

          <div className="bg-[#0FB279] text-white p-6 rounded-2xl max-w-md shadow-lg shadow-[#0FB279]/20">
            <p className="text-lg font-medium mb-2 italic">
              "This tool helped me land my dream job!"
            </p>
            <p className="text-sm opacity-90">
              - Sarah Johnson, Software Engineer
            </p>
          </div>
        </div>

        {/* Right Content - Form */}
        <div className="w-full lg:w-[540px]">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-[#0D4D3B] mb-2">Create Your Account</h2>
            <p className="text-[#4A6D63]">Get started with your free account</p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-xl shadow-emerald-900/5 border border-white">
            <form className="space-y-5"  onSubmit={handleRegister}>
              <div>
                <label className="block text-sm font-semibold text-[#1A4D3E] mb-2">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input 
                      type="text"
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)} 
                         className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0D4D3B]/20 focus:border-[#0D4D3B] transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#1A4D3E] mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input 
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} 
                    className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0D4D3B]/20 focus:border-[#0D4D3B] transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#1A4D3E] mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="Create a strong password" 
                    value={password}
                     onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-12 py-3.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0D4D3B]/20 focus:border-[#0D4D3B] transition-all"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2">Must be at least 8 characters</p>
              </div>

              <div className="text-center py-2">
                <p className="text-sm text-[#4A6D63]">
                  I agree to the <a href="#" className="text-[#0D4D3B] font-bold">Terms of Service</a> and <a href="#" className="text-[#0D4D3B] font-bold">Privacy Policy</a>
                </p>
              </div>

              <button className="w-full bg-[#0D4D3B] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#0a3a2d] transition-colors shadow-lg shadow-emerald-950/20">
                Create Account
              </button>

              <div className="relative my-8 flex items-center justify-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <span className="relative px-4 bg-white text-sm text-gray-500">Or sign up with</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button className="flex items-center justify-center gap-2 py-3 border border-gray-200 rounded-xl font-semibold text-[#1A4D3E] hover:bg-gray-50 transition-colors">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  Google
                </button>
                <button className="flex items-center justify-center gap-2 py-3 border border-gray-200 rounded-xl font-semibold text-[#1A4D3E] hover:bg-gray-50 transition-colors">
                  <Github size={20} />
                  GitHub
                </button>
              </div>

              <p className="text-center text-sm text-[#4A6D63] pt-4">
                Already have an account? <button type="button" onClick={() => navigate('/login')} className="text-[#0D4D3B] font-bold hover:underline">Sign in</button>
              </p>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Registration