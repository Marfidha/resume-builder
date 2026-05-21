import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FileText } from 'lucide-react';
import logo from "../assets/PeakCV Logo.png"
import axios from 'axios';
import { SignInButton ,useUser ,useClerk,UserButton,useAuth} from "@clerk/react";
import API_BASE_URL from "../config/api.js";


const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { getToken } = useAuth();
  const { openSignIn } = useClerk();

  const isLandingPage = location.pathname === '/';
  const { user, isSignedIn, isLoaded } = useUser();
  const navbarClasses = isLandingPage
    ? "fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md shadow-sm" // Landing page style
    : "absolute top-0 left-0 right-0 z-50 bg-transparent";      // Other pages style
  

  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      syncUser();
    }
  }, [isLoaded, isSignedIn,user]);

const syncUser = async () => {

  try {

    const token = await getToken({
      template: "default"
    });

    console.log(token);

    const response = await axios.post(
      `${API_BASE_URL}/api/users/sync`,
      {
        name: user.fullName,
        email: user.primaryEmailAddress?.emailAddress,
        image: user.imageUrl
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    console.log(response.data);

  } catch (err) {

    console.log(err.response?.data);

    console.error("User sync failed", err);
  }
};
  return (
    <div className={isLandingPage ? "" : "relative"}>
      <nav className={`w-full transition-all duration-300 px-8 md:px-16 ${navbarClasses}`}>
        <div className="flex items-center justify-between py-1 max-w-7xl mx-auto w-full">
          {/* Logo Section */}
          <div className="flex items-center cursor-pointer  " onClick={() => navigate("/")}>
            {logo ? (
              <img 
                src={logo} 
                alt="PeakCV Logo"
                className="h-18 w-auto object-contain"
              />
            ) : (
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-[#0D4D3B] rounded-xl flex items-center justify-center text-white">
                  <FileText size={24} />
                </div>
                <span className="text-xl font-bold text-[#0D4D3B] tracking-tight">PeakCV</span>
              </div>
            )}
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">

            <button 
              onClick={() => navigate("/about")} 
              className="cursor-pointer hover:text-[#0D4D3B] transition-colors"
            >
              About
            </button>

            {/* <button 
              onClick={() => navigate("/login")} 
              className="cursor-pointer hover:text-[#0D4D3B] transition-colors"
            >
              Login
            </button> */}
            
             {
          !isSignedIn ? (
            <button 
              onClick={openSignIn}
              className="cursor-pointer bg-[#0D4D3B] text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-[#0a3a2d] transition-all active:scale-95 shadow-md hover:shadow-lg"
            >
              {/* Sign Up */}
              Login
            </button>
          ):(
            <UserButton afterSignOutUrl="/" />
          )
        }
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button className="text-[#0D4D3B] p-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;