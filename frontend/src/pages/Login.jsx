import React, { useState, useEffect } from 'react';
import { Mail, Lock, Eye, EyeOff, FileText, Github } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import logo from "../assets/PeakCV Logo.png"
import { SignInButton ,useUser ,useClerk} from "@clerk/react";


const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [toastMessage, setToastMessage] = useState(location.state?.message || "");
  const { user, isSignedIn, isLoaded } = useUser();
  const { openSignIn } = useClerk();


  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage("");
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const [email, setEmail] = useState("");
const [password, setPassword] = useState("");


const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.post(
      "http://localhost:5000/api/auth/login",
      { email, password }
    );

    const data = res.data;

    // ✅ save token
    localStorage.setItem("token", data.token);

    alert("Login successful ✅");

    // ✅ redirect
    navigate("/");

  } catch (error) {
    console.error(error);

    if (error.response) {
      alert(error.response.data.message);
    } else {
      alert("Server error ❌");
    }
  }
};

  return (
    <div className="min-h-screen bg-[#E9FBF3] font-sans text-[#1A4D3E] flex flex-col">
      {/* Toast Message */}
      {toastMessage && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-[#1A4D3E] text-white px-6 py-3.5 rounded-xl shadow-2xl z-50 animate-in slide-in-from-bottom-5 fade-in duration-300 border border-[#0D4D3B]">
          <p className="font-medium text-sm flex items-center gap-2">
            <Lock size={16} />
            {toastMessage}
          </p>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-8 md:px-16 py-12">
        {/* Header Icon & Text */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-[#D1F7E8] rounded-full flex items-center justify-center mb-6">
            <FileText className="text-[#0D4D3B]" size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-[#0D4D3B] mb-3">
            Welcome Back
          </h1>
          <p className="text-[#4A6D63] text-lg">
            Sign in to continue building your professional resume
          </p>
        </div>

        {/* Login Card */}
        <div className="w-full max-w-[540px] bg-white rounded-[32px] p-8 md:p-12 shadow-xl shadow-emerald-900/5 border border-white">
          <form className="space-y-6"  onSubmit={handleLogin}>
            {/* Email Address */}
            <div>
              <label className="block text-sm font-bold text-[#1A4D3E] mb-2.5">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input 
                  type="email" 
                  value={email}
                 onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com" 
                  className="w-full pl-12 pr-4 py-4 border border-gray-100 bg-[#F9FAFB] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0D4D3B]/10 focus:border-[#0D4D3B] transition-all placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex justify-between items-center mb-2.5">
                <label className="text-sm font-bold text-[#1A4D3E]">Password</label>
                <a href="#" className="text-sm font-semibold text-[#0D4D3B] hover:underline">Forgot password?</a>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={password}
                 onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password" 
                  className="w-full pl-12 pr-12 py-4 border border-gray-100 bg-[#F9FAFB] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0D4D3B]/10 focus:border-[#0D4D3B] transition-all placeholder:text-gray-400"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center gap-3">
              <button 
                type="button"
                onClick={() => setRememberMe(!rememberMe)}
                className={`w-5 h-5 rounded border transition-all flex items-center justify-center ${
                  rememberMe ? 'bg-[#0D4D3B] border-[#0D4D3B]' : 'bg-white border-gray-300'
                }`}
              >
                {rememberMe && <div className="w-2 h-2 bg-white rounded-sm" />}
              </button>
              <span className="text-sm font-medium text-[#4A6D63]">Remember me for 30 days</span>
            </div>

            {/* Sign In Button */}
            <button  className="w-full bg-[#0D4D3B] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#0a3a2d] transition-all shadow-lg shadow-emerald-950/20 active:scale-[0.98]">
              Sign In
            </button>

            {/* Divider */}
            <div className="relative my-8 flex items-center justify-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-100"></div>
              </div>
              <span className="relative px-6 bg-white text-sm font-medium text-gray-400">Or continue with</span>
            </div>

            {/* Social Logins */}
            <div className="grid grid-cols-2 gap-4">
              
              <button onClick={() => openSignIn({ strategy: "oauth_google" })} className="flex items-center justify-center gap-3 py-3.5 border border-gray-100 rounded-xl font-bold text-[#1A4D3E] hover:bg-gray-50 transition-colors">
                Google
              </button>
              
              <button  onClick={() => openSignIn({ strategy: "oauth_github" })} className="flex items-center justify-center gap-3 py-3.5 border border-gray-100 rounded-xl font-bold text-[#1A4D3E] hover:bg-gray-50 transition-colors">
                <Github size={20} />
                GitHub
              </button>
            </div>

            {/* Sign Up Link */}
            <p className="text-center text-sm font-medium text-[#4A6D63] pt-4">
              Don't have an account? <button type="button" onClick={() => navigate('/register')} className="text-[#0D4D3B] font-bold hover:underline">Sign up for free</button>
            </p>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Login;