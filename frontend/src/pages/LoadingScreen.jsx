import React, { useEffect, useState } from "react";

const LoadingScreen = () => {
  const [loadingText, setLoadingText] = useState("Loading");

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingText((prev) => (prev.length < 10 ? prev + "." : "Loading"));
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-green-50 via-amber-50 to-white text-gray-800">
      {/* Centered Logo */}
      <img
        src="/potato logo.png"
        alt="Potato Care Logo"
        className="w-42 h-32 mb-8 animate-bounce"
      />

      {/* Branded Text */}
      <h1 className="text-4xl font-extrabold text-green-800 mb-2">
        Potato Care<span className="text-amber-600">™</span>
      </h1>
      <p className="text-gray-600 mb-8">Empowering Smart Agriculture</p>

      {/* Spinner and Loading Text */}
      <div className="relative w-12 h-12 mb-6">
        <div className="absolute w-full h-full border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
      </div>

      <h2 className="text-lg font-semibold text-green-700 animate-pulse mb-4">
        {loadingText}
      </h2>

      <p className="text-sm text-gray-500">
        Please wait while we prepare your dashboard...
      </p>
    </div>
  );
};

export default LoadingScreen;
