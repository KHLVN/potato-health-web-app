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


// import React, { useEffect, useState } from "react";
// import Navbar from "../components/Navbar";

// function History() {
//   const [logs, setLogs] = useState([]);

//   useEffect(() => {
//     fetch("http://localhost:5001/api/history") // adjust URL as needed
//       .then((res) => res.json())
//       .then((data) => setLogs(data))
//       .catch((err) => console.error(err));
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <Navbar />
//       <div className="max-w-5xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow">
//         <h1 className="text-2xl font-semibold mb-4">Classification History</h1>

//         {logs.length === 0 ? (
//           <p className="text-gray-500">No history available.</p>
//         ) : (
//           <table className="w-full border-collapse">
//             <thead>
//               <tr className="bg-gray-200 text-left">
//                 <th className="p-3">Image</th>
//                 <th className="p-3">Prediction</th>
//                 <th className="p-3">Confidence</th>
//                 <th className="p-3">Date</th>
//               </tr>
//             </thead>
//             <tbody>
//               {logs.map((log, index) => (
//                 <tr key={index} className="border-t hover:bg-gray-50">
//                   <td className="p-3">
//                     <img
//                       src={log.imageUrl}
//                       alt="classified"
//                       className="w-16 h-16 rounded-lg object-cover"
//                     />
//                   </td>
//                   <td className="p-3">{log.prediction}</td>
//                   <td className="p-3">{(log.confidence * 100).toFixed(2)}%</td>
//                   <td className="p-3">{new Date(log.date).toLocaleString()}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </div>
//   );
// }

// export default History;

// File: client/src/pages/HistoryPage.js
import React, { useState, useEffect } from 'react';

function HistoryPage() {
  const [myImages, setMyImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        // --- THIS IS THE IMPORTANT PART ---
        const token = localStorage.getItem('token'); 

        if (!token) {
          setError('You must be logged in to see your history.');
          setLoading(false);
          return;
        }

        const response = await fetch('http://localhost:5001/api/my-history', { // Use your API prefix
          headers: {
            'x-auth-token': token, // Send the token
          },
        });
        // ------------------------------------

        if (!response.ok) {
          throw new Error('Failed to fetch history');
        }

        const data = await response.json();
        setMyImages(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []); // Runs once on component mount

  if (loading) return <div>Loading your history...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="history-container">
      <h2>My Saved Images</h2>
      {myImages.length === 0 ? (
        <p>You have not saved any images yet.</p>
      ) : (
        <div className="image-grid">
          {myImages.map(image => (
            <div key={image._id} className="history-item">
              {/* Note: You may need to build the full URL to view the image */}
              <img src={`http://localhost:5001/${image.path}`} alt={image.filename} />
              <p>Saved on: {new Date(image.createdAt).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default HistoryPage;