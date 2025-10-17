import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function IntroPage() {
  const navigate = useNavigate();
  const [navBg, setNavBg] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setNavBg(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll helper
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="w-full min-h-screen text-gray-800 bg-gradient-to-b from-green-50 via-amber-50 to-white scroll-smooth">
      {/* NAVBAR */}
      <nav
        className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md shadow-md z-50 transition-all duration-300"
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          {/* Logo & Title */}
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <img
              src="potato logo.png"
              alt="Potato Care Logo"
              className="w-10 h-10 object-contain"
            />
            <h1 className="text-xl md:text-2xl font-extrabold text-green-700">
              Potato Care<span className="text-amber-600">™</span>
            </h1>
          </div>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <button
              onClick={() => scrollToSection("about")}
              className="hover:text-green-700 transition-colors"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("features")}
              className="hover:text-green-700 transition-colors"
            >
              Features
            </button>
            <button
              onClick={() => navigate("/login")}
              className="px-4 py-2 rounded-full bg-green-600 text-white hover:bg-green-700 transition-all shadow-md"
            >
              Login
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

      {/* HERO SECTION */}
      <section className="h-screen flex flex-col items-center justify-center text-center px-6">
        <motion.img
          src="potato logo.png"
          alt="Potato Care Logo"
          className="w-42 h-32 mb-7"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        />
        <motion.h1
          className="text-4xl md:text-6xl font-extrabold text-green-800 mb-4"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Welcome to <span className="text-amber-600">Potato Health Classifier</span>
          <span> </span>
          By <span className="text-amber-600">Potato Care™</span>
        </motion.h1>
        <p className="max-w-2xl text-gray-600 mb-8">
          Empowering farmers and growers with smart plant disease detection and
          care guidance — powered by AI and sustainability.
        </p>
        <div className="flex gap-4">
          <button
            onClick={() => navigate("/login")}
            className="px-6 py-3 bg-green-600 text-white rounded-full shadow-md hover:bg-green-700 transition-all"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="px-6 py-3 bg-amber-500 text-white rounded-full shadow-md hover:bg-amber-600 transition-all"
          >
            Sign Up
          </button>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="py-20 px-6 md:px-16 bg-white text-center">
        <h2 className="text-3xl md:text-4xl font-semibold text-green-700 mb-6">
          About Potato Care™
        </h2>
        <p className="max-w-3xl mx-auto text-gray-600 leading-relaxed">
          Potato Care™ is your smart agricultural companion. Using advanced image
          recognition, it helps identify crop health and diseases early,
          providing practical solutions and care recommendations tailored for
          Filipino farmers.
        </p>

        <div className="flex flex-wrap justify-center gap-6 mt-10">
          <img
            src="healthy.jpg"
            alt="Healthy potatoes"
            className="w-72 h-48 object-cover rounded-xl shadow-md"
          />
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section
        id="features"
        className="py-20 px-6 md:px-16 bg-green-50 text-center"
      >
        <h2 className="text-3xl md:text-4xl font-semibold text-green-700 mb-8">
          Features
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all">
            <h3 className="text-xl font-semibold text-green-600 mb-2">
              Health or Disease Detection
            </h3>
            <p className="text-gray-600">
              Identify potato health issues instantly using your
              uploaded images.
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all">
            <h3 className="text-xl font-semibold text-green-600 mb-2">
              Classification Accuracy
            </h3>
            <p className="text-gray-600">
              Accurate Health Classification driven by a Deep Learning Model
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all">
            <h3 className="text-xl font-semibold text-green-600 mb-2">
              Smart Recommendations
            </h3>
            <p className="text-gray-600">
              Get AI-powered suggestions for optimal care, fertilization, and
              watering.
            </p>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="py-24 text-center bg-gradient-to-r from-green-600 to-amber-500 text-white">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to take care of your crops?
        </h2>
        <p className="mb-8 text-lg">
          Start using Potato Care™ today and make farming smarter and more
          sustainable.
        </p>
        <button
          onClick={() => navigate("/signup")}
          className="px-8 py-3 bg-white text-green-700 font-semibold rounded-full shadow-md hover:bg-gray-200 transition-all"
        >
          Get Started
        </button>
      </section>

      {/* FOOTER */}
      <footer className="py-6 text-center text-sm text-gray-500 bg-gray-100">
        © {new Date().getFullYear()} Potato Care™. All rights reserved.
      </footer>
    </div>
  );
}
