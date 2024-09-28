import { useState, useEffect } from "react";
import { Bar, Pie } from "react-chartjs-2"; // Chart.js or any other charting library
import "tailwindcss/tailwind.css"; // Assuming you're using Tailwind CSS

export default function ReportPage() {
  const [reportData, setReportData] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [dateRange, setDateRange] = useState({ start: "", end: "" });

  useEffect(() => {
    const fetchData = async () => {
      const data = await fakeApiCall();
      setReportData(data);
      setFilteredData(data);
    };
    fetchData();
  }, []);

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setDateRange({ ...dateRange, [name]: value });
  };

  const filterDataByDate = () => {
    if (!reportData) return;
    const filtered = reportData.filter((entry) => {
      const entryDate = new Date(entry.date);
      const startDate = new Date(dateRange.start);
      const endDate = new Date(dateRange.end);
      return entryDate >= startDate && entryDate <= endDate;
    });
    setFilteredData(filtered);
  };

  const fakeApiCall = async () => {
    return [
      { category: "Module 1", progress: 70, date: "2024-09-01" },
      { category: "Module 2", progress: 90, date: "2024-09-05" },
      { category: "Module 3", progress: 60, date: "2024-09-10" },
    ];
  };

  const formatBarChartData = () => {
    if (!filteredData) return {};
    const categories = filteredData.map((entry) => entry.category);
    const progress = filteredData.map((entry) => entry.progress);

    return {
      labels: categories,
      datasets: [
        {
          label: "Progress",
          backgroundColor: "#42A5F5",
          borderColor: "#1E88E5",
          data: progress,
        },
      ],
    };
  };

  const formatPieChartData = () => {
    if (!filteredData) return {};
    const categories = filteredData.map((entry) => entry.category);
    const progress = filteredData.map((entry) => entry.progress);

    return {
      labels: categories,
      datasets: [
        {
          data: progress,
          backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        },
      ],
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-8">
      <h1 className="text-4xl font-bold text-center text-white mb-8">
        Student Report
      </h1>

      {/* Date Range Filter */}
      <div className="flex justify-center mb-6 space-x-4">
        <input
          type="date"
          name="start"
          value={dateRange.start}
          onChange={handleDateChange}
          className="p-2 border rounded-lg shadow-lg"
        />
        <input
          type="date"
          name="end"
          value={dateRange.end}
          onChange={handleDateChange}
          className="p-2 border rounded-lg shadow-lg"
        />
        <button
          onClick={filterDataByDate}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
        >
          Filter
        </button>
      </div>

      {/* Bar Chart - Module Progress */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Progress by Module</h2>
        <div className="w-full">
          <Bar data={formatBarChartData()} width={400} height={200} />
        </div>
      </div>

      {/* Pie Chart - Completion Distribution */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Completion Distribution</h2>
        <div className="w-full">
          <Pie data={formatPieChartData()} width={400} height={200} />
        </div>
      </div>

      {/* Summary */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Summary</h2>
        {filteredData ? (
          <div>
            <p className="text-lg">Total Modules: {filteredData.length}</p>
            <p className="text-lg">
              Overall Progress:{" "}
              {(
                filteredData.reduce((sum, entry) => sum + entry.progress, 0) /
                filteredData.length
              ).toFixed(2)}
              %
            </p>
          </div>
        ) : (
          <p>Loading summary...</p>
        )}
      </div>

      {/* Export Button */}
      <div className="text-center">
        <button
          onClick={() => alert("Export functionality to be implemented.")}
          className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition"
        >
          Export Report (PDF/CSV)
        </button>
      </div>
    </div>
  );
}
