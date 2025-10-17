import React from "react";
import Navbar from "../components/Navbar";

function AboutUs() {
  return (
    <div className="min-h-screen flex flex-col items-center text-gray-800 bg-gradient-to-b from-green-50 via-amber-50 to-white relative">
      {/* Navbar */}
      <Navbar />

      {/* Content Section */}
      <div className="flex-grow w-full flex items-center justify-center px-6 py-24 md:py-32">
        <div className="bg-white/80 backdrop-blur-lg border border-green-100 rounded-3xl shadow-2xl p-10 md:p-14 max-w-4xl text-center transition-all hover:shadow-green-100/50">
          <h1 className="text-4xl md:text-5xl font-extrabold text-green-700 mb-6">
            About <span className="text-amber-600">Potato Care™</span>
          </h1>

          <p className="mt-4 text-lg leading-relaxed text-gray-700">
            We are <span className="font-semibold text-green-700">Team 8</span> in{" "}
            <span className="font-semibold text-black">CPE 025-CPE41S1</span>.  
            Our objective and project is to develop an interactive and user-friendly web app
            to classify the health of potatoes using a deep learning model.  
            Our project is titled:
          </p>

          <p className="mt-4 text-lg font-semibold text-green-800 italic">
            “Design of a Deep Learning-Based Potato Health Classification System for Pre-Curing Segregation.”
          </p>

          <p className="mt-8 text-lg leading-relaxed text-gray-700">
            The <span className="font-semibold text-green-700">Potato Health Classification</span> project
            is designed to help farmers and agricultural researchers quickly identify
            the health status of potato plants through image-based analysis powered by
            artificial intelligence.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-gray-700">
            Users can upload a photo of a potato, and the system will determine whether it’s
            healthy or infected by diseases such as{" "}
            <span className="font-semibold text-green-700">Early Blight</span> or{" "}
            <span className="font-semibold text-green-700">Late Blight</span>.  
            This promotes sustainable agriculture, improves crop management,
            and minimizes losses by enabling early disease detection.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-gray-700">
            This system was developed as part of our research and development project in
            <span className="font-semibold text-green-700"> Computer Engineering</span>,
            focusing on the application of Artificial Intelligence in the agricultural sector.
          </p>
        </div>
      </div>

      {/* Decorative Background Pattern (optional subtle touch) */}
      <div className="absolute top-0 left-0 w-full h-full bg-[url('/Background.png')] bg-cover bg-center opacity-10 -z-10"></div>
    </div>
  );
}

export default AboutUs;
