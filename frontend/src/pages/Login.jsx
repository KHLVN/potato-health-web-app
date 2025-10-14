import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "./LoadingScreen"; 

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false); 


  const handleLogin = (e) => {
    e.preventDefault();

    if (username.endsWith("@gmail.com") && password.trim() !== "") {
      setIsLoading(true); 
      setTimeout(() => {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userRole", "user");
        navigate("/dashboard");
      }, 2000); // simulate loading delay (2 sec)
    } else {
      alert("Please enter a valid Gmail address and password!");
    }
  };

  const handleGuestLogin = () => {
    setIsLoading(true); 
    setTimeout(() => {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userRole", "guest");
      navigate("/dashboard");
    }, 2000);
  };


  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col"
      style={{ backgroundImage: "url('/Background.png')" }}
    >

      <div className="flex flex-grow items-center justify-center">
        <div className="bg-gradient-to-b from-[#D9E9CF] to-[#7A8374] backdrop-blur-md p-8 rounded-2xl shadow-lg w-96 text-white">
          <h1 className="text-3xl font-bold text-center mb-6 text-green-900">
            Potato Classifier
          </h1>

          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="✉ Email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 text-gray-800"
              required
            />
            <input
              type="password"
              placeholder="✱ Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 text-gray-800"
              required
            />
            <button
              type="submit"
              className="w-full bg-green-700 text-white py-2 rounded-lg hover:bg-green-800 transition"
            >
              Login
            </button>
          </form>

          <button
            onClick={handleGuestLogin}
            className="w-full bg-gray-200 text-gray-700 mt-3 py-2 rounded-lg hover:bg-gray-300 transition"
          >
            Continue as Guest
          </button>

          <p className="text-center mt-4 text-gray-100">
            Don’t have an account?{" "}
            <span
              className="text-black font-bold hover:underline cursor-pointer"
              onClick={() => navigate("/signup")}
            >
              Sign up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;