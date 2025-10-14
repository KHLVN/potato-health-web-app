import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userRole");
    navigate("/");
  };

const handleClassify = async () => {
  if (!image) return alert("Please select an image first.");

  const categories = [
    {
      key: "healthy",
      label: "Healthy Potato",
      description:
        "The potato appears healthy with smooth skin and no visible signs of infection. This type of potato is safe for consumption and can be used for storage or planting.",
      suggestions: [
        "Store in a cool, dry place.",
        "Avoid direct sunlight.",
        "Regularly inspect for any sprouting or dark spots.",
      ],
    },
    {
      key: "fungal",
      label: "Fungal-Infected Potato",
      description:
        "This potato shows signs of fungal infection, such as dark or moldy patches. It can spread rapidly to other potatoes if not isolated.",
      suggestions: [
        "Do not consume or store with healthy potatoes.",
        "Dispose of infected potatoes properly.",
        "Disinfect the storage area to prevent spread.",
      ],
    },
    {
      key: "bacterial",
      label: "Bacterial-Infected Potato",
      description:
        "This potato is likely suffering from a bacterial infection. Symptoms include soft, wet, and discolored areas with a foul odor.",
      suggestions: [
        "Avoid touching other potatoes after handling.",
        "Clean tools and surfaces used for handling.",
        "Do not plant infected potatoes; they can contaminate soil.",
      ],
    },
  ];

  const formData = new FormData();
  formData.append("image", image);

  const res = await fetch("http://localhost:5001/api/images/upload", {
    method: "POST",
    body: formData,
  });

  const data = await res.json(); // e.g., { result: "healthy" }

  // Match backend result with category
  const matched = categories.find(
    (item) => item.key === data.disease
  );

  setResult(matched || null);
};


  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col relative"
      style={{
        backgroundImage: "url('/Background.png')",
      }}
    >
      {/* Navbar (always visible on top) */}
      <div className="z-50">
        <Navbar />
      </div>

      {/* Main Content */}
      <div className="flex flex-grow items-center justify-center px-8 py-10 backdrop-blur-sm bg-black/20 z-0">
        <div className="flex flex-col md:flex-row gap-8 w-full max-w-7xl">
          {/* Upload */}
          <div className="flex-1 bg-gradient-to-b from-[#D9E9CF] to-[#7A8374] backdrop-blur-md rounded-2xl shadow-xl p-8 text-center">
            <h1 className="text-3xl font-bold text-green-700 mb-4">
              Drag and Drop Image
            </h1>
            
            <p className="text-gray-700 mb-4">
              Format: JPEG OR JPG, PNG, SVG
            </p>

            <p className="text-gray-700 mb-4">
              Upload an image of a potato to classify its health condition.
            </p>

            <div className="border-2 border-dashed border-green-400 rounded-xl p-6 mb-4 bg-white/60">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full text-sm"
              />
            </div>

            {preview && (
              <div className="mt-4">
                <img
                  src={preview}
                  alt="Preview"
                  className="rounded-xl mx-auto w-80 h-80 object-cover shadow-md border-4 border-green-300"
                />
                <p className="text-gray-700 mt-2 font-medium">
                  {image?.name}
                </p>
              </div>
            )}

            <button
              onClick={handleClassify}
              disabled={!image}
              className={`mt-6 w-full py-3 rounded-lg text-black font-bold ${
                image
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-gray-400 cursor-not-allowed"
              } transition`}
            >
              Classify
            </button>
          </div>

          {/* Mock Results */}
          <div className="flex-1 bg-white/70 backdrop-blur-md rounded-2xl shadow-xl p-8 overflow-y-auto">
            <h2 className="text-3xl font-bold text-green-800 mb-4">
              Classification Result
            </h2>

            {!result ? (
              <p className="text-gray-600 italic">
                Results will appear here after classification.
              </p>
            ) : (
              <div>
                <h3 className="text-2xl font-semibold text-green-700 mb-2">
                  {result.label}
                </h3>
                <p className="text-gray-700 mb-4">{result.description}</p>

                <h4 className="text-lg font-semibold text-green-800 mb-2">
                  Recommended Actions:
                </h4>
                <ul className="list-disc list-inside text-gray-700 text-left space-y-1">
                  {result.suggestions.map((tip, idx) => (
                    <li key={idx}>{tip}</li>
                  ))}
                </ul>
              </div>
              
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
