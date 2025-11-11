import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setShowError(false);

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      setShowError(true);
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("http://localhost:5001/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        setErrorMessage(data.error || data.message || "Registration failed");
        setShowError(true);
        return;
      }

      setShowSuccess(true);
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      console.error(err);
      setErrorMessage("Connection error. Please try again.");
      setShowError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-green-50 via-amber-50 to-white">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md shadow-md z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img
              src="potato logo.png"
              alt="Potato Care Logo"
              className="w-10 h-10 object-contain hover:scale-110 transition-transform"
            />
            <h1 className="text-xl md:text-2xl font-extrabold text-green-700">
              Potato Care<span className="text-amber-600">™</span>
            </h1>
          </div>

          <div className="hidden md:flex gap-6 text-sm font-medium">
            <button
              onClick={() => navigate("/")}
              className="hover:text-green-700 transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => navigate("/login")}
              className="px-4 py-2 rounded-full bg-green-700 text-white hover:bg-green-800 transition-all"
            >
              Login
            </button>
          </div>
        </div>
      </nav>

      {/* Centered Form */}
      <div className="flex flex-grow items-center justify-center mt-20 px-4">
        <div className="bg-white/70 backdrop-blur-md p-10 rounded-3xl shadow-2xl w-full max-w-md border border-green-100">
          <div className="flex flex-col items-center mb-6">
            <h1 className="text-3xl font-bold text-green-800 text-center">
              Create Account
            </h1>
            <p className="text-gray-600 text-center mt-2">
              Join Potato Care™ today!
            </p>
          </div>

          <form onSubmit={handleSignup} className="space-y-5 mt-6">
            <input
              type="text"
              placeholder="👤 Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
            <input
              type="email"
              placeholder="✉ Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
            <input
              type="password"
              placeholder="✱ Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
            <input
              type="password"
              placeholder="✱ Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-amber-500 text-white py-3 rounded-xl font-semibold shadow-md hover:bg-amber-600 transition-all disabled:opacity-50"
            >
              {isLoading ? "Creating Account..." : "Sign Up"}
            </button>
          </form>

          <p className="text-center mt-6 text-gray-600">
            Already have an account?{" "}
            <span
              className="text-green-700 font-bold hover:underline cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-6 text-center text-sm text-gray-500 bg-gray-100 mt-10">
        © {new Date().getFullYear()} Potato Care™. All rights reserved.
      </footer>

      {/* Success Popup */}
      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white p-8 rounded-2xl shadow-2xl text-center w-80">
            <h2 className="text-lg font-semibold text-green-600 mb-3">
              ✓ Account Created Successfully!
            </h2>
            <p className="text-gray-600 text-sm">Redirecting to login...</p>
          </div>
        </div>
      )}

      {/* Error Popup */}
      {showError && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white p-8 rounded-2xl shadow-2xl text-center w-80">
            <h2 className="text-lg font-semibold text-red-600 mb-3">
              {errorMessage}
            </h2>
            <button
              onClick={() => setShowError(false)}
              className="mt-3 px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Signup;
