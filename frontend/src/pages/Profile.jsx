import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { User } from "lucide-react"; 

function Profile() {
  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    role: localStorage.getItem("userRole") || "user",
    memberSince: "",
    uploads: 0,
    lastActivity: "",
    bio: "",
  });

  useEffect(() => {
    // Get data from localStorage
    const storedName = localStorage.getItem("fullName");
    const storedEmail = localStorage.getItem("email");
    const storedMemberSince = localStorage.getItem("memberSince") || "October 2025";

    setUserData({
      fullName: storedName || "Guest User",
      email: storedEmail || "guest@potatocare.com",
      role: localStorage.getItem("userRole") || "guest",
      memberSince: storedMemberSince,
      uploads: localStorage.getItem("uploads") || 0,
      lastActivity:
        localStorage.getItem("lastActivity") || "No activity yet.",
      bio:
        storedName && storedEmail
          ? "A proud member of Potato Care™, helping grow healthier crops with AI technology."
          : "Guest account — explore our features before signing up.",
    });
  }, []);

  const isGuest = userData.role === "guest";

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-green-50 via-amber-50 to-white">
      <Navbar />

      <div className="flex flex-col items-center mt-28 px-6 py-10">
        <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-10 w-full max-w-4xl border border-green-100">
          {/* Header */}
          <div className="flex flex-col items-center text-center">
            <div className="w-32 h-32 flex items-center justify-center rounded-full border-4 border-green-300 bg-green-50 shadow-md mb-4">
              <User className="w-16 h-16 text-green-700" />
            </div>
            <h1 className="text-3xl font-bold text-green-800">
              {userData.fullName}
            </h1>
            <p className="text-gray-600 mt-1">{userData.email}</p>
            <p className="text-sm text-amber-700 mt-1 capitalize">
              Role: {userData.role}
            </p>
            <p className="text-gray-500 mt-1">
              Member Since {userData.memberSince}
            </p>
          </div>

          {/* Bio Section */}
          <div className="mt-8 text-center">
            <h2 className="text-xl font-semibold text-green-700 mb-2">
              About Me
            </h2>
            <p className="text-gray-700">{userData.bio}</p>

            {isGuest && (
              <div className="mt-4 bg-amber-100 border border-amber-300 text-amber-800 rounded-xl p-4 shadow-sm">
                <p className="font-medium">
                  ⚠️ You are currently using a guest account.
                </p>
                <p className="text-sm mt-1">
                  Login or create an account to save your data in your profile.
                </p>
              </div>
            )}
          </div>

          {/* Stats Section */}
          {!isGuest && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 text-center">
              <div className="bg-green-50 p-5 rounded-2xl shadow-md border border-green-100">
                <h3 className="text-lg font-semibold text-green-700">Uploads</h3>
                <p className="text-2xl font-bold text-green-900">
                  {userData.uploads}
                </p>
              </div>
              <div className="bg-amber-50 p-5 rounded-2xl shadow-md border border-amber-100">
                <h3 className="text-lg font-semibold text-amber-700">
                  Last Activity
                </h3>
                <p className="text-sm text-gray-700 mt-1">
                  {userData.lastActivity}
                </p>
              </div>
              <div className="bg-green-50 p-5 rounded-2xl shadow-md border border-green-100">
                <h3 className="text-lg font-semibold text-green-700">
                  Account Status
                </h3>
                <p className="text-sm text-gray-700 mt-1">Active User</p>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-center gap-6 mt-10">
            {!isGuest && (
              <button
                onClick={() => alert("Feature coming soon!")}
                className="px-6 py-3 bg-green-600 text-white rounded-full shadow-md hover:bg-green-700 transition-all"
              >
                Edit Profile
              </button>
            )}
            <button
              onClick={() => {
                localStorage.removeItem("isLoggedIn");
                localStorage.removeItem("userRole");
                localStorage.removeItem("fullName");
                localStorage.removeItem("email");
                window.location.href = "/";
              }}
              className="px-6 py-3 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600 transition-all"
            >
              Logout
            </button>
          </div>

          {/* Quote or Tip */}
          <div className="mt-10 text-center text-gray-600 italic">
            <p>“Healthy crops start with smart care — grow with Potato Care™.”</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
