import React from "react";
import Navbar from "../components/Navbar";
import { Cpu, Camera, Cloud, CheckCircle } from "lucide-react";

const HowItWorks = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col items-center text-gray-800"
      style={{ backgroundImage: "url('/Background.png')" }}
    >
      <Navbar />

      <div className="bg-white/80 backdrop-blur-md p-10 mt-16 rounded-2xl shadow-lg max-w-4xl text-center">
        <h1 className="text-4xl font-bold text-green-700 mb-8">How It Works</h1>

        <div className="grid md:grid-cols-2 gap-10 text-left">
          {/* Step 1 */}
          <div className="flex items-start space-x-4">
            <Camera className="w-10 h-10 text-green-700 mt-1" />
            <div>
              <h2 className="text-xl font-semibold text-green-700">
                1. Capture or Upload a Tuber Image
              </h2>
              <p className="text-gray-700">
                Start by taking a clear photo of your potato plant’s tuber or
                uploading one from your device. Make sure the tuber is visible and
                well-lit for better results.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex items-start space-x-4">
            <Cloud className="w-10 h-10 text-green-700 mt-1" />
            <div>
              <h2 className="text-xl font-semibold text-green-700">
                2. Image Processing
              </h2>
              <p className="text-gray-700">
                The uploaded image is processed and analyzed using our trained
                deep learning model, ensuring high accuracy in identifying disease
                patterns.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex items-start space-x-4">
            <Cpu className="w-10 h-10 text-green-700 mt-1" />
            <div>
              <h2 className="text-xl font-semibold text-green-700">
                3. Model Classification
              </h2>
              <p className="text-gray-700">
                The system classifies the tuber as either healthy or affected by
                diseases such as Early Blight or Late Blight using machine learning
                algorithms.
              </p>
            </div>
          </div>

          {/* Step 4 */}
          <div className="flex items-start space-x-4">
            <CheckCircle className="w-10 h-10 text-green-700 mt-1" />
            <div>
              <h2 className="text-xl font-semibold text-green-700">
                4. Result Display
              </h2>
              <p className="text-gray-700">
                The result is displayed on the dashboard along with the detected
                disease and confidence score, helping users make informed decisions
                about treatment or prevention.
              </p>
            </div>
          </div>
        </div>

        <p className="mt-8 text-gray-700">
          The system simplifies disease detection using artificial intelligence,
          ensuring faster and more reliable monitoring of potato crop health.
        </p>
      </div>
    </div>
  );
};

export default HowItWorks;
