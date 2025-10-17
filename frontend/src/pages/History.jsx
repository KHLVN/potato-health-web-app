function History() {
  const mockData = [
    { id: 1, filename: "potato1.jpg", result: "Healthy", date: "2025-10-10" },
    { id: 2, filename: "potato2.jpg", result: "Early Blight", date: "2025-10-09" },
  ];

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold text-green-700 mb-6">History Logs</h1>

      <table className="w-full border border-gray-200">
        <thead className="bg-green-100">
          <tr>
            <th className="p-3 border">Filename</th>
            <th className="p-3 border">Result</th>
            <th className="p-3 border">Date</th>
          </tr>
        </thead>
        <tbody>
          {mockData.map((item) => (
            <tr key={item.id} className="text-center">
              <td className="p-3 border">{item.filename}</td>
              <td
                className={`p-3 border ${
                  item.result === "Healthy"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {item.result}
              </td>
              <td className="p-3 border">{item.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default History;
