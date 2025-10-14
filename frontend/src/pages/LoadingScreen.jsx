import React, { useEffect, useState } from "react";
import Dashboard from "./Dashboard";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for 2 seconds
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return isLoading ? <LoadingScreen /> : <Dashboard />;
};

const LoadingScreen = () => {
  const [loadingText, setLoadingText] = useState("Loading");

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingText((prev) =>
        prev.length < 10 ? prev + "." : "Loading"
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#D9E9CF] to-[#7A8374] text-gray-800"
      style={{
        backgroundImage: "url('/Background.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Logo */}
      <img
        src="/potato logo.png"
        alt="Potato Classifier Logo"
        className="w-42 h-32 mb-6 animate-bounce"
      />

      {/* Loading Text */}
      <h1 className="text-3xl font-bold text-green-800 animate-pulse mb-4">
        {loadingText}
      </h1>

      {/* Spinner */}
      <div className="relative w-12 h-12">
        <div className="absolute w-full h-full border-4 border-green-400 border-t-transparent rounded-full animate-spin"></div>
      </div>

      <p className="text-sm mt-6 text-gray-700 opacity-80">
        Please wait while we prepare your Dashboard.
      </p>
    </div>
  );
};

export default LoadingScreen;

