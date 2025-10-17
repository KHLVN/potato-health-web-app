import React from "react";
import Navbar from "../components/Navbar";
import { Cpu, Camera, Cloud, CheckCircle } from "lucide-react";

const HowItWorks = () => {
  return (
    <div className="min-h-screen flex flex-col items-center text-gray-800 bg-gradient-to-b from-green-50 via-amber-50 to-white relative">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="flex-grow w-full flex items-center justify-center px-6 py-24 md:py-32">
        <div className="bg-white/80 backdrop-blur-lg border border-green-100 rounded-3xl shadow-2xl p-10 md:p-14 max-w-5xl text-center transition-all hover:shadow-green-100/50">
          <h1 className="text-4xl md:text-5xl font-extrabold text-green-700 mb-10">
            How It <span className="text-amber-600">Works</span>
          </h1>

          {/* Step Grid */}
          <div className="grid md:grid-cols-2 gap-10 text-left">
            {/* Step 1 */}
            <div className="flex items-start space-x-4 bg-white/60 border border-green-100 rounded-2xl p-5 hover:shadow-md transition-all">
              <Camera className="w-10 h-10 text-green-700 mt-1" />
              <div>
                <h2 className="text-xl font-semibold text-green-700">
                  1. Capture or Upload a Potato Image
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  Start by taking a clear photo of your potato crop and upload
                  one from your device. Ensure it’s well-lit and focused for better
                  classification accuracy.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-start space-x-4 bg-white/60 border border-green-100 rounded-2xl p-5 hover:shadow-md transition-all">
              <Cloud className="w-10 h-10 text-green-700 mt-1" />
              <div>
                <h2 className="text-xl font-semibold text-green-700">
                  2. Image Processing
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  The uploaded image is processed and analyzed using our trained
                  deep learning model, ensuring precise recognition of potato disease
                  patterns.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-start space-x-4 bg-white/60 border border-green-100 rounded-2xl p-5 hover:shadow-md transition-all">
              <Cpu className="w-10 h-10 text-green-700 mt-1" />
              <div>
                <h2 className="text-xl font-semibold text-green-700">
                  3. Model Classification
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  The system classifies the potato crop as either healthy or affected by
                  common diseases such as <span className="font-semibold">Early Blight</span> or{" "}
                  <span className="font-semibold">Late Blight</span> using
                  our advanced AI model.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex items-start space-x-4 bg-white/60 border border-green-100 rounded-2xl p-5 hover:shadow-md transition-all">
              <CheckCircle className="w-10 h-10 text-green-700 mt-1" />
              <div>
                <h2 className="text-xl font-semibold text-green-700">
                  4. Result Display
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  The result appears on your dashboard, showing the detected disease,
                  confidence score, and actionable care tips to guide proper treatment
                  or prevention.
                </p>
              </div>
            </div>
          </div>

          {/* Summary */}
          <p className="mt-10 text-lg leading-relaxed text-gray-700 max-w-3xl mx-auto">
            The system simplifies potato disease detection using{" "}
            <span className="font-semibold text-green-700">Artificial Intelligence</span>,
            providing farmers and researchers with faster, more reliable tools to
            monitor crop health and improve yield outcomes.
          </p>
        </div>
      </div>

      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-full h-full bg-[url('/Background.png')] bg-cover bg-center opacity-10 -z-10"></div>
    </div>
  );
};

export default HowItWorks;
