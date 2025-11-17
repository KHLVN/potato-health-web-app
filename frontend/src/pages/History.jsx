import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("userRole") || "guest";
        const loggedIn = localStorage.getItem("isLoggedIn") === "true";

        // ✔ BLOCK GUESTS and NON-LOGGED-IN
        if (!loggedIn || role === "guest" || !token) {
          setError("You must be logged in to view history.");
          setLoading(false);
          return;
        }

        const res = await fetch("http://localhost:5001/api/users/my-history", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          if (res.status === 401) {
            setError("Your session expired. Please log in again.");
          } else {
            setError("Failed to fetch history.");
          }
          setLoading(false);
          return;
        }

        const data = await res.json();
        setHistory(data);
      } catch (err) {
        console.error("FETCH ERROR:", err);
        setError("An error occurred. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (loading) {
    return (
      <div className="p-12 min-h-screen bg-gradient-to-b from-green-50 via-amber-50 to-white">
        <Navbar />
        <div className="text-center text-3xl font-bold text-green-700 mt-20">
          Loading your classification history...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-12 min-h-screen bg-gradient-to-b from-green-50 via-amber-50 to-white">
        <Navbar />
        <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow text-center">
          <p className="text-red-600 font-semibold">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-12 min-h-screen bg-gradient-to-b from-green-50 via-amber-50 to-white">
      <Navbar />

      <div className="max-w-5xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow">
        <h1 className="text-4xl md:text-5xl font-extrabold text-green-700 text-center mb-6 drop-shadow-sm">
          Classification <span className="text-amber-600">History</span>
        </h1>

        {history.length === 0 ? (
          <p className="text-gray-500 text-center text-lg">
            You have no classification history yet.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse min-w-[600px]">
              <thead>
                <tr className="bg-gray-200 text-left">
                  <th className="p-4 w-32">Image</th>
                  <th className="p-3">Prediction</th>
                  <th className="p-3">Confidence</th>
                  <th className="p-3">Date</th>
                </tr>
              </thead>

              <tbody>
                {history.map((log) => (
                  <tr key={log._id} className="border-t hover:bg-gray-50">
                    <td className="p-3">
                      <img
                        src={`http://localhost:5001/uploads/${log.image.filename}`}
                        alt={log.image.filename}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                    </td>

                    <td className={`p-3 capitalize ${getDiseaseColor(log.disease)}`}>
                      {log.disease}
                    </td>

                    <td className="p-3">
                      {(log.probability_score * 100).toFixed(2)}
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

const getDiseaseColor = (disease) => {
  if (!disease) return "text-gray-700";

  switch (disease.toLowerCase()) {
    case "healthy":
      return "text-green-600 font-semibold";
    case "fungal":
      return "text-amber-400 font-semibold";
    case "bacterial":
      return "text-red-600 font-semibold";
    default:
      return "text-gray-700";
  }
};

export default History;
