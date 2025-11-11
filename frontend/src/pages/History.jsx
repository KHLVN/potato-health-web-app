// import Navbar from "../components/Navbar";

// function History() {
//   const mockData = [
//     { id: 1, filename: "potato1.jpg", result: "Healthy", date: "2025-10-10" },
//     { id: 2, filename: "potato2.jpg", result: "Early Blight", date: "2025-10-09" },
//   ];

//   return (
//     <div className="p-6 min-h-screen bg-gray-50">
//       <Navbar />
//       <h1 className="text-3xl font-bold text-green-700 mb-6">History Logs</h1>

//       <table className="w-full border border-gray-200">
//         <thead className="bg-green-100">
//           <tr>
//             <th className="p-3 border">Filename</th>
//             <th className="p-3 border">Result</th>
//             <th className="p-3 border">Date</th>
//           </tr>
//         </thead>
//         <tbody>
//           {mockData.map((item) => (
//             <tr key={item.id} className="text-center">
//               <td className="p-3 border">{item.filename}</td>
//               <td
//                 className={`p-3 border ${
//                   item.result === "Healthy"
//                     ? "text-green-600"
//                     : "text-red-600"
//                 }`}
//               >
//                 {item.result}
//               </td>
//               <td className="p-3 border">{item.date}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default History;


import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

const USE_MOCK = true; // set true while developing to show sample data

const SAMPLE_HISTORY = [
  {
    _id: "64f1a1c0a1b2c3d4e5f60001",
    image: {
      path: "../uploads/potato1.jpg",
      filename: "potato1.jpg",
      url: "http://localhost:5001/uploads/potato1.jpg",
    },
    disease: "healthy",
    probability_score: 0.9873,
    createdAt: "2025-11-01T09:12:34.000Z",
    user: "64f1a1c0a1b2c3d4e5f600aa",
  },
  {
    _id: "64f1a1c0a1b2c3d4e5f60002",
    image: {
      path: "uploads/potato2.jpg",
      filename: "potato2.jpg",
      url: "http://localhost:5001/uploads/potato2.jpg",
    },
    disease: "early blight",
    probability_score: 0.7645,
    createdAt: "2025-10-28T14:45:00.000Z",
    user: "64f1a1c0a1b2c3d4e5f600aa",
  },
  {
    _id: "64f1a1c0a1b2c3d4e5f60003",
    image: {
      path: "uploads/potato3.jpg",
      filename: "potato3.jpg",
      url: "http://localhost:5001/uploads/potato3.jpg",
    },
    disease: "late blight",
    probability_score: 0.6231,
    createdAt: "2025-10-20T07:20:10.000Z",
    user: "64f1a1c0a1b2c3d4e5f600bb", // another user (will be filtered if you filter by current user)
  },
  {
    _id: "64f1a1c0a1b2c3d4e5f60004",
    image: {
      path: "uploads/potato4.jpg",
      filename: "potato4.jpg",
      url: "http://localhost:5001/uploads/potato4.jpg",
    },
    disease: "healthy",
    probability_score: 0.915,
    createdAt: "2025-09-15T11:00:00.000Z",
    user: "64f1a1c0a1b2c3d4e5f600aa",
  },
  {
    _id: "64f1a1c0a1b2c3d4e5f60005",
    image: {
      path: null,
      filename: "remote-pic.jpg",
      url: "https://via.placeholder.com/200x200.png?text=Potato+5",
    },
    disease: "early blight",
    probability_score: 0.452,
    createdAt: "2025-08-03T18:30:00.000Z",
    user: "64f1a1c0a1b2c3d4e5f600aa",
  },
];

function History() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (USE_MOCK) {
      setTimeout(() => {
        setLogs(SAMPLE_HISTORY);
        setLoading(false);
      }, 400);
      return;
    }

    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token || localStorage.getItem("userRole") === "guest") {
          setError("You must be logged in to view your history.");
          setLoading(false);
          return;
        }

        const res = await fetch("http://localhost:5001/api/history", {
          headers: {
            "x-auth-token": token,
          },
        });

        if (!res.ok) {
          if (res.status === 401) {
            setError("Your session expired. Please log in again.");
          } else {
            setError("Failed to fetch history.");
          }
          throw new Error("Failed to fetch");
        }

        const data = await res.json();
        setHistory(data); // Set the history from the backend
      } catch (err) {
        console.error(err);
        if (!error) {
          setError("An error occurred. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []); // The empty array [] means this runs once when the component mounts

  // --- Helper components for loading/error states ---
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="max-w-5xl mx-auto mt-10 p-6 text-center">
          <p>Loading your history...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-12 min-h-screen bg-gray-100">
        <Navbar />
        <div className="max-w-5xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow text-center">
          <p className="text-red-600 font-semibold">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-12 min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-5xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow">
        <h1 className="text-2xl font-semibold mb-4">Classification History</h1>

        {logs.length === 0 ? (
          <p className="text-gray-500">You have not classified any images yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse min-w-[600px]">
              <thead>
                <tr className="bg-gray-200 text-left">
                  <th className="p-3">Image</th>
                  <th className="p-3">Prediction</th>
                  <th className="p-3">Confidence</th>
                  <th className="p-3">Date</th>
                </tr>
              </thead>
              <tbody>
                {/* 4. Map over the 'history' state */}
                {logs.map((log) => (
                  <tr key={log._id} className="border-t hover:bg-gray-50">
                    <td className="p-3">
                      {/* 5. Use the image path from the populated data */}
                      <img
                        src={`http://localhost:5001/${log.image.path}`}
                        alt={log.image.filename}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                    </td>
                    {/* 6. Use the correct data fields from your controller */}
                    <td className="p-3 capitalize">{log.disease}</td>
                    <td className="p-3">
                      {(log.probability_score * 100).toFixed(2)}%
                    </td>
                    <td className="p-3">
                      {new Date(log.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default History;