import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

const Settings = () => {
  const [theme, setTheme] = useState("light");
  const [threshold, setThreshold] = useState(0.5);
  const [notifications, setNotifications] = useState(true);
  const [autoSave, setAutoSave] = useState(true);

  // 🔹 Apply theme globally when it changes
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const handleThemeChange = (e) => setTheme(e.target.value);
  const handleThresholdChange = (e) => setThreshold(parseFloat(e.target.value));
  const handleNotificationToggle = () => setNotifications(!notifications);
  const handleAutoSaveToggle = () => setAutoSave(!autoSave);

  const handleSaveSettings = () => {
    const settings = { theme, threshold, notifications, autoSave };
    localStorage.setItem("userSettings", JSON.stringify(settings));
    alert("✅ Settings saved successfully!");
  };

  const handleReset = () => {
    setTheme("light");
    setThreshold(0.5);
    setNotifications(true);
    setAutoSave(true);
    localStorage.removeItem("userSettings");
    document.documentElement.classList.remove("dark");
    alert("⚙️ Settings have been reset to default.");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-amber-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 dark:text-white transition-all duration-500">
      <Navbar />

      <div className="flex flex-col items-center justify-center py-20 px-6">
        <h1 className="text-4xl font-bold text-green-700 dark:text-green-400 mb-4">Settings</h1>
        <p className="text-gray-700 dark:text-gray-300 text-center mb-10 max-w-2xl">
          Customize your Potato Care™ preferences to match your workflow and comfort.  
          Adjust your theme, AI confidence threshold, and notification preferences here.
        </p>

        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-3xl shadow-xl p-10 w-full max-w-lg space-y-6 border border-green-100 dark:border-gray-700 transition-all">
          {/* Theme Toggle */}
          <div>
            <label className="font-semibold text-lg">App Theme:</label>
            <select
              value={theme}
              onChange={handleThemeChange}
              className="w-full mt-2 p-3 border rounded-lg bg-white dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-green-400"
            >
              <option value="light">🌞 Light Mode</option>
              <option value="dark">🌙 Dark Mode</option>
            </select>
          </div>

          {/* Confidence Threshold */}
          <div>
            <label className="font-semibold text-lg">
              AI Confidence Threshold: {Math.round(threshold * 100)}%
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
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Higher values increase accuracy but may reduce detections.
            </p>
          </div>

          {/* Notification Preference */}
          <div className="flex items-center justify-between mt-4">
            <label className="font-semibold text-lg">Notifications:</label>
            <button
              onClick={handleNotificationToggle}
              className={`px-4 py-2 rounded-full font-medium transition-all ${
                notifications
                  ? "bg-green-600 text-white hover:bg-green-700"
                  : "bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white hover:bg-gray-400"
              }`}
            >
              {notifications ? "Enabled" : "Disabled"}
            </button>
          </div>

          {/* Auto-Save Option */}
          <div className="flex items-center justify-between mt-2">
            <label className="font-semibold text-lg">Auto-Save Results:</label>
            <button
              onClick={handleAutoSaveToggle}
              className={`px-4 py-2 rounded-full font-medium transition-all ${
                autoSave
                  ? "bg-amber-500 text-white hover:bg-amber-600"
                  : "bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white hover:bg-gray-400"
              }`}
            >
              {autoSave ? "On" : "Off"}
            </button>
          </div>

          {/* Save Button */}
          <button
            onClick={handleSaveSettings}
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition font-semibold mt-6"
          >
            💾 Save Settings
          </button>

          {/* Reset Button */}
          <button
            onClick={handleReset}
            className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition font-semibold"
          >
            ♻️ Reset to Default
          </button>
        </div>

        {/* Tip / Footer */}
        <p className="text-gray-600 dark:text-gray-400 italic mt-10 text-center">
          “Your preferences help Potato Care™ grow smarter with you.”
        </p>
      </div>
    </div>
  );
};

export default Settings;
