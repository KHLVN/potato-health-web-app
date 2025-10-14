import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userRole");
    navigate("/");
  };

  //  Helper to check active page
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="w-full bg-white shadow-md px-8 py-2 flex justify-between items-center rounded-b-xl">
      {/* Left section - Logo and title */}
      <div className="flex items-center space-x-4">
        <img
          src="/potato logo.png"
          alt="Potato Classifier Logo"
          className="w-14 h-14 object-contain transform hover:scale-110 transition-transform duration-300"
        />
        <h1 className="text-3xl font-bold text-black tracking-wide">
          Potato
        </h1>
      </div>

      {/* Right section - Nav buttons */}
      <div className="flex items-center space-x-6 relative">
        {[
          { name: "Dashboard", path: "/dashboard" },
          { name: "About Us", path: "/about" },
          { name: "How It Works", path: "/how-it-works" },
          { name: "Contact Us", path: "/contact-us" },
        ].map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`relative text-green-700 font-medium transition-all duration-300 
              hover:text-green-900 hover:scale-105
              ${isActive(item.path) ? "text-green-900 font-bold" : ""}
            `}
          >
            {item.name}
            {/* Animated underline effect */}
            <span
              className={`absolute left-0 bottom-0 h-[2px] bg-green-700 transition-all duration-300 
                ${isActive(item.path) ? "w-full" : "w-0 group-hover:w-full"}
              `}
            ></span>
          </button>
        ))}

        {/* User Menu Toggle */}
        <div className="relative">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800 transition"
          >
            ☰
          </button>

          {/* Dropdown Sidebar */}
          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg border border-gray-200">
              <button
                onClick={() => {
                  navigate("/profile");
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-t-lg"
              >
                Profile
              </button>
              <button
                onClick={() => {
                  navigate("/settings");
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Settings
              </button>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 rounded-b-lg"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
