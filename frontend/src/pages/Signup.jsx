import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Signup() {
  const navigate = useNavigate();

  return (
    <div
      className="relative min-h-screen bg-cover bg-center flex flex-col items-center justify-center"
      style={{ backgroundImage: "url('/Background.png')" }}
    >
      {/* ✅ Navbar fixed at the top */}
      <div className="absolute top-0 left-0 w-full z-50">
        <Navbar />
      </div>

      {/* Signup Card */}
      <div className="bg-gradient-to-b from-[#D9E9CF] to-[#7A8374] backdrop-blur-md shadow-xl rounded-2xl p-8 w-96 text-white mt-20">
        <h1 className="text-3xl font-bold text-center text-green-700 mb-6">
          Create Account
        </h1>

        <input
          type="text"
          placeholder="Full Name"
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 text-black"
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 text-black"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 text-black"
        />

        <button
          onClick={() => navigate("/dashboard")}
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
        >
          Sign Up
        </button>

        <p className="text-center mt-4 text-gray-200">
          Already have an account?{" "}
          <span
            className="text-green-200 hover:underline cursor-pointer"
            onClick={() => navigate("/")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default Signup;
