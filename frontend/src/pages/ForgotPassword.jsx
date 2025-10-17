import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.endsWith("@gmail.com")) {
      alert("Please enter a valid Gmail address.");
      return;
    }
    setShowPopup(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-green-50 via-amber-50 to-white">
      {/* Navbar */}
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
        </div>
      </nav>

      {/* Forgot Password Form */}
      <div className="flex flex-grow items-center justify-center mt-20 px-4">
        <div className="bg-white/70 backdrop-blur-md p-10 rounded-3xl shadow-2xl w-full max-w-md border border-green-100">
          <h1 className="text-3xl font-bold text-green-800 text-center mb-4">
            Forgot Password
          </h1>
          <p className="text-gray-600 text-center mb-6">
            Enter your registered Gmail address, and we'll send you a reset link.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="email"
              placeholder="✉ Your Gmail Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 text-gray-800 placeholder-gray-500"
              required
            />
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold shadow-md hover:bg-green-700 transition-all"
            >
              Send Reset Link
            </button>
            <p
              onClick={() => navigate("/login")}
              className="text-sm text-center text-green-700 hover:underline cursor-pointer mt-3"
            >
              Back to Login
            </p>
          </form>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-6 text-center text-sm text-gray-500 bg-gray-100 mt-10">
        © {new Date().getFullYear()} Potato Care™. All rights reserved.
      </footer>

      {/* Popup Confirmation */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white p-8 rounded-2xl shadow-2xl text-center w-80 animate-fadeIn">
            <h2 className="text-lg font-semibold text-green-700 mb-3">
              Reset Link Sent!
            </h2>
            <p className="text-gray-600 mb-4 text-sm">
              Please check your email inbox for password reset instructions.
            </p>
            <button
              onClick={() => {
                setShowPopup(false);
                navigate("/login");
              }}
              className="mt-3 px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-all"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ForgotPassword;
