import React from "react";
import Navbar from "../components/Navbar";

function AboutUs() {
  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col items-center text-gray-800"
      style={{ backgroundImage: "url('/Background.png')" }}
    >
      <Navbar />

      <div className="bg-white/80 backdrop-blur-md p-10 mt-16 rounded-2xl shadow-lg max-w-3xl text-center">
        <h1 className="text-4xl font-bold text-green-700 mb-6">
          About Potato Health Classification
        </h1>
        <p className="text-lg leading-relaxed text-gray-700">
          The <span className="font-semibold text-green-700">Potato Health Classification</span> project
          is designed to help farmers and agricultural researchers quickly identify
          the health status of potato plants using image-based analysis powered by
          machine learning.  
        </p>
        <p className="mt-4 text-lg leading-relaxed text-gray-700">
          By uploading a photo of a potato leaf, our system can determine whether
          the plant is healthy or affected by common diseases such as Early Blight
          or Late Blight. This project aims to support sustainable agriculture,
          improve crop management, and reduce losses by providing an easy-to-use
          and accessible tool for plant health monitoring.
        </p>
        <p className="mt-4 text-lg leading-relaxed text-gray-700">
          This system was created as part of a research and development project in
          Computer Engineering, focusing on the application of Artificial
          Intelligence in the agricultural sector.
        </p>
      </div>
    </div>
  );
}

export default AboutUs;
