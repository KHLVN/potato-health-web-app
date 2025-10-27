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

  const isActive = (path) => location.pathname === path;
  const getThemeColor = (path) => {
    if (path === "/dashboard" || path === "/how-it-works") return "green";
    if (path === "/about" || path === "/contact-us") return "amber";
    return "green"; 
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md shadow-md z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        {/* Left Section: Logo and Title */}
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img
            src="/potato logo.png"
            alt="Potato Care Logo"
            className="w-10 h-10 object-contain hover:scale-110 transition-transform duration-300"
          />
          <h1 className="text-xl md:text-2xl font-extrabold text-green-700">
            Potato Care<span className="text-amber-600">™</span>
          </h1>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          {[
            { name: "Dashboard", path: "/dashboard" },
            { name: "About Us", path: "/about" },
            { name: "How It Works", path: "/how-it-works" },
            { name: "Contact Us", path: "/contact-us" },
            { name: "History", path: "/history" }
          ].map((item) => {
            const color = getThemeColor(item.path);
            const activeColor =
              color === "green"
                ? "text-green-800 font-semibold"
                : "text-amber-700 font-semibold";
            const hoverColor =
              color === "green"
                ? "hover:text-green-900"
                : "hover:text-amber-800";
            const underlineColor =
              color === "green" ? "bg-green-700" : "bg-amber-600";

            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`relative group transition-all duration-300 ${
                  isActive(item.path)
                    ? activeColor
                    : `text-gray-700 ${hoverColor}`
                }`}
              >
                {item.name}
                <span
                  className={`absolute left-0 bottom-[-4px] h-[2px] transition-all duration-300 ${
                    isActive(item.path)
                      ? `w-full ${underlineColor}`
                      : `w-0 ${underlineColor} group-hover:w-full`
                  }`}
                ></span>
              </button>
            );
          })}

          {/* Dropdown Menu Trigger */}
          <div className="relative">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="px-4 py-2 bg-amber-600 text-white rounded-full hover:bg-amber-700 shadow-md transition-all"
            >
              ☰
            </button>
            {isMenuOpen && (
              <div className="absolute right-0 mt-3 w-48 bg-white/90 backdrop-blur-lg rounded-2xl border border-green-200 shadow-2xl overflow-hidden animate-fadeIn">
                <div className="py-2">
                  <button
                    onClick={() => {
                      navigate("/profile");
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left px-5 py-2.5 text-gray-700 hover:bg-green-50 hover:text-green-800 transition-all"
                  >
                    Profile
                  </button>
                  <button
                    onClick={() => {
                      navigate("/settings");
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left px-5 py-2.5 text-gray-700 hover:bg-green-50 hover:text-green-800 transition-all"
                  >
                    Settings
                  </button>
                  <div className="border-t border-green-100 my-1"></div>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-5 py-2.5 text-red-600 hover:bg-red-50 transition-all"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
