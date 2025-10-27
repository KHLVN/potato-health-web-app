import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    if (username.endsWith("@gmail.com") && password.trim() !== "") {
      setTimeout(() => {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userRole", "user");
        navigate("/dashboard");
      }, 2000);
    } else {
      setShowError(true);
    }
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

          <div className="hidden md:flex gap-6 text-sm font-medium">
            <button
              onClick={() => navigate("/")}
              className="hover:text-green-700 transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="px-4 py-2 rounded-full bg-amber-500 text-white hover:bg-amber-600 transition-all shadow-md"
            >
              Sign Up
            </button>
          </div>
        </div>
      </nav>

      {/* Centered Form */}
      <div className="flex flex-grow items-center justify-center mt-20 px-4">
        <div className="bg-white/70 backdrop-blur-md p-10 rounded-3xl shadow-2xl w-full max-w-md border border-green-100">
          <div className="flex flex-col items-center mb-6">
            <h1 className="text-3xl font-bold text-green-800 text-center">
              Potato Care™ Login
            </h1>
            <p className="text-gray-600 text-center mt-2">
              Welcome back! Please sign in to continue.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5 mt-6">
            <input
              type="text"
              placeholder="✉ Email Address"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 text-gray-800 placeholder-gray-500"
              required
            />
            <input
              type="password"
              placeholder="✱ Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 text-gray-800 placeholder-gray-500"
              required
            />

            {/* Forgot Password Link */}
            <p
              className="text-sm text-right text-green-700 hover:underline cursor-pointer"
              onClick={() => navigate("/forgot-password")}
            >
              Forgot Password?
            </p>

            <button
              type="submit"
              className="w-full bg-amber-500 text-white py-3 rounded-xl font-semibold shadow-md hover:bg-amber-600 transition-all"
            > 
              Login
            </button>
          </form>

          <p className="text-center mt-6 text-gray-600">
            Don’t have an account?{" "}
            <span
              className="text-green-700 font-bold hover:underline cursor-pointer"
              onClick={() => navigate("/signup")}
            >
              Sign up
            </span>
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-6 text-center text-sm text-gray-500 bg-gray-100 mt-10">
        © {new Date().getFullYear()} Potato Care™. All rights reserved.
      </footer>

      {/* 🔹 Popup Message for Incorrect Login */}
      {showError && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white p-8 rounded-2xl shadow-2xl text-center w-80 animate-fadeIn">
            <h2 className="text-lg font-semibold text-red-600 mb-3">
              Email or Password is Incorrect.
            </h2>
            <button
              onClick={() => setShowError(false)}
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

export default Login;
