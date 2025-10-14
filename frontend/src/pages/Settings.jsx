import React, { useState } from "react";
import Navbar from "../components/Navbar";

const Settings = () => {
  const [theme, setTheme] = useState("light");
  const [model, setModel] = useState("MobileNetV2");
  const [threshold, setThreshold] = useState(0.5);

  const handleThemeChange = (e) => setTheme(e.target.value);
  const handleModelChange = (e) => setModel(e.target.value);
  const handleThresholdChange = (e) => setThreshold(parseFloat(e.target.value));

  return (
    <div
      className={`min-h-screen bg-cover bg-center ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
      style={{ backgroundImage: "url('/Background.png')" }}
    >
      <Navbar />

      <div className="flex flex-col items-center justify-center py-16 px-6">
        <h1 className="text-3xl font-bold text-green-700 mb-6">Settings</h1>
        <p className="text-gray-700 mb-8 text-center max-w-2xl">
          Customize your experience and model preferences for the Potato Health Classification System.
        </p>

        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-8 w-full max-w-lg space-y-6">
          {/* Theme Toggle */}
          <div>
            <label className="font-semibold text-lg">Theme:</label>
            <select
              value={theme}
              onChange={handleThemeChange}
              className="w-full mt-2 p-3 border rounded-lg"
            >
              <option value="light">🌞 Light Mode</option>
              <option value="dark">🌙 Dark Mode</option>
            </select>
          </div>

          {/* Model Selection */}
          <div>
            <label className="font-semibold text-lg">Default Model:</label>
            <select
              value={model}
              onChange={handleModelChange}
              className="w-full mt-2 p-3 border rounded-lg"
            >
              <option value="MobileNetV2">MobileNetV2 (Fast & Lightweight)</option>
              <option value="RT-DETR">RT-DETR (Advanced Object Detection)</option>
              <option value="EfficientNet">EfficientNet (High Accuracy)</option>
            </select>
          </div>

          {/* Confidence Threshold */}
          <div>
            <label className="font-semibold text-lg">
              Prediction Confidence Threshold: {Math.round(threshold * 100)}%
            </label>
            <input
              type="range"
              min="0.1"
              max="0.99"
              step="0.01"
              value={threshold}
              onChange={handleThresholdChange}
              className="w-full mt-3 accent-green-600"
            />
          </div>

          {/* Save Button (mock only) */}
          <button className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition">
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
