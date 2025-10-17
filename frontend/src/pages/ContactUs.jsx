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
      name: "Peña, John Kenneth",
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
    <div className="min-h-screen flex flex-col items-center text-gray-800 bg-gradient-to-b from-green-50 via-amber-50 to-white relative">
      {/* Navbar */}
      <Navbar />

      {/* Header Section */}
      <div className="text-center pt-28 pb-10 px-6">
        <h1 className="text-4xl md:text-5xl font-extrabold text-green-700 mb-4">
          Meet Our <span className="text-amber-600">Team</span>
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-gray-700 leading-relaxed">
          We are a passionate group of Computer Engineering students dedicated to building
          the <span className="font-semibold text-green-700">Potato Health Classification System</span>.
          You can reach us directly through the contact details below.
        </p>
      </div>

      {/* Team Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-10 pb-20 max-w-7xl w-full">
        {members.map((member, index) => (
          <div
            key={index}
            className="bg-white/80 backdrop-blur-lg border border-green-100 rounded-3xl shadow-2xl p-6 flex flex-col items-center text-center transition-all hover:shadow-green-100/50 hover:-translate-y-2"
          >
            <img
              src={member.image}
              alt={member.name}
              className="w-32 h-32 object-cover rounded-full mb-4 border-4 border-green-300 shadow-md"
            />
            <h2 className="text-xl font-bold text-green-700">{member.name}</h2>
            <p className="text-gray-600 mb-2">{member.role}</p>
            <div className="text-sm text-gray-700 leading-relaxed">
              <p className="font-medium">📧 {member.email}</p>
              <p className="italic">{member.field}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-full h-full bg-[url('/Background.png')] bg-cover bg-center opacity-10 -z-10"></div>
    </div>
  );
};

export default ContactUs;
