import React from "react";
import Navbar from "../components/Navbar";

const ContactUs = () => {
  const members = [
    {
      name: "Nicolas, Khelvin",
      role: "Frontend & Backend",
      email: "qkpnicolas@tip.edu.ph",
      field: "Systems Administration",
      image: "/nicolas.png",
    },
    {
      name: "Sembrero, Christian Dane",
      role: "Project Manager / UI Designer",
      email: "qcddsembrero@tip.edu.ph",
      field: "Systems Administration",
      image: "/sembrero.jpg",
    },
    {
      name: "Peña, John Kenneth.",
      role: "Machine Learning Specialist",
      email: "qjkbpena@tip.edu.ph",
      field: "Data Science",
      image: "/pena.png",
    },
    {
      name: "Roldan, Christian Cyril",
      role: "Quality Assurance Specialist",
      email: "qccnroldan@tip.edu.ph",
      field: "Cyber-Physical Systems",
      image: "/roldan.png",
    },
  ];

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/Background.png')" }}
    >
      <Navbar />
      <div className="flex flex-col items-center justify-center text-center py-20 bg-black/30">
        <h1 className="text-4xl font-bold text-white mb-8">Meet Our Team</h1>
        <p className="text-white mb-10 max-w-2x3">
          We’re a passionate group of Computer Engineering students dedicated to building the
          <span className="font-semibold text-green-400"> Potato Health Classification System</span>.
          <p className="text-white mb-10 max-w-2x3"></p>
          You can reach us directly through our contact details below.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-10 max-w-6xl">
          {members.map((member, index) => (
            <div
              key={index}
              className="bg-white/80 rounded-2xl shadow-lg p-6 hover:shadow-xl transition transform hover:scale-105"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-32 h-32 object-cover rounded-full mx-auto mb-4 border-4 border-green-300"
              />
              <h2 className="text-xl font-bold text-green-700">{member.name}</h2>
              <p className="text-gray-600">{member.role}</p>
              <div className="mt-3 text-sm text-gray-800">
                <p>📧 {member.email}</p>
                <p>{member.field}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactUs;

