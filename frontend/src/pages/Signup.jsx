import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "./LoadingScreen";

function Signup() {
  const navigate = useNavigate();
  const [emailPopup, setEmailPopup] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSignup = () => {
    setIsLoading(true);
    setShowSuccess(true);
  };

  const handleGuestLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userRole", "guest");
      navigate("/dashboard");
    }, 2000);
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-green-50 via-amber-50 to-white">
      {/* Navbar (consistent with Intro & Login) */}
      <nav className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md shadow-md z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img
              src="potato logo.png"
              alt="Potato Care Logo"
              className="w-10 h-10 object-contain hover:scale-110 transition-transform duration-300"
            />
            <h1 className="text-xl md:text-2xl font-extrabold text-green-700">
              Potato Care<span className="text-amber-600">™</span>
            </h1>
          </div>

          <div className="hidden md:flex gap-6 text-sm font-medium">
            <button
              onClick={() => navigate("/")}
              className="hover:text-green-700 transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => navigate("/login")}
              className="px-4 py-2 rounded-full bg-green-600 text-white hover:bg-green-700 transition-all shadow-md"
            >
              Login
            </button>
          </div>
        </div>
      </nav>

      {/* Signup Form */}
      <div className="flex flex-grow items-center justify-center mt-20 px-4">
        <div className="relative bg-white/70 backdrop-blur-md p-10 rounded-3xl shadow-2xl w-full max-w-md border border-green-100">
          <div className="flex flex-col items-center mb-6">
            <h1 className="text-3xl font-bold text-green-800 text-center">
              Create Account
            </h1>
            <p className="text-gray-600 text-center mt-2">
              Join Potato Care™ and start your smart farming journey.
            </p>
          </div>

          <input
            type="text"
            placeholder="Full Name"
            className="w-full mb-4 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 text-gray-800 placeholder-gray-500"
          />
          <input
            type="email"
            placeholder="Email Address"
            onBlur={(e) => {
              const email = e.target.value;
              if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
                setEmailPopup(true);
              }
            }}
            onFocus={() => setEmailPopup(false)}
            className="w-full mb-4 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 text-gray-800 placeholder-gray-500"
          />

          <div className="relative">
            <input
              type="password"
              placeholder="Password"
              onFocus={() => setPasswordFocus(true)}
              onBlur={() => setPasswordFocus(false)}
              className="w-full mb-6 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 text-gray-800 placeholder-gray-500"
            />
            {/* Password Guide */}
            {passwordFocus && (
              <div className="absolute right-[-310px] top-0 bg-white/90 border border-green-200 rounded-2xl shadow-lg p-4 w-72 text-sm text-gray-700 animate-fadeIn z-10">
                <div className="absolute left-[-8px] top-4 w-0 h-0 border-t-8 border-b-8 border-r-8 border-t-transparent border-b-transparent border-r-green-200"></div>
                <p className="text-green-700 font-semibold mb-1">
                  Password Requirements:
                </p>
                <ul className="list-disc ml-5 space-y-1">
                  <li>Must be at least 10 characters</li>
                  <li>Include a number and symbol (e.g. #, @, !)</li>
                  <li>Contain uppercase and lowercase letters</li>
                  <li>Use a strong and secure password</li>
                </ul>
              </div>
            )}
          </div>

          <button
            onClick={handleSignup}
            className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold shadow-md hover:bg-green-700 transition-all"
          >
            Sign Up
          </button>

          <button
            onClick={handleGuestLogin}
            className="w-full bg-amber-400 text-white mt-4 py-3 rounded-xl font-semibold shadow-md hover:bg-amber-500 transition-all"
          >
            Continue as Guest
          </button>

          <p className="text-center mt-6 text-gray-600">
            Already have an account?{" "}
            <span
              className="text-green-700 font-bold hover:underline cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-6 text-center text-sm text-gray-500 bg-gray-100 mt-10">
        © {new Date().getFullYear()} Potato Care™. All rights reserved.
      </footer>

      {/* 🔹 Email Popup */}
      {emailPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white p-8 rounded-2xl shadow-2xl text-center w-80 animate-fadeIn">
            <h2 className="text-lg font-semibold text-red-600 mb-3">
              Use a valid Email Address
            </h2>
            <button
              onClick={() => setEmailPopup(false)}
              className="mt-3 px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-all"
            >
              OK
            </button>
          </div>
        </div>
      )}

      {/* Success Popup */}
      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white/95 backdrop-blur-md p-8 rounded-2xl shadow-2xl text-center w-96 animate-fadeIn">
            <h2 className="text-xl font-semibold text-green-700 mb-3">
              Account Successfully Created!
            </h2>
            <p className="text-gray-700 mb-6">
              Log in now to get started with Potato Care™.
            </p>
            <button
              onClick={() => {
                setShowSuccess(false);
                navigate("/login");
              }}
              className="px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-all"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Signup;
