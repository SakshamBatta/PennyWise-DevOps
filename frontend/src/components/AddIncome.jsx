import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddIncome() {
  const [formData, setFormData] = useState({
    source: "",
    amount: 0,
    date: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("authToken");
      await axios.post("http://localhost:3000/api/income/create", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate("/income");
    } catch (error) {
      console.error("Failed to add income:", error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center py-10">
      <div className="w-full max-w-lg bg-white shadow-xl rounded-2xl p-10 transform transition-all hover:scale-105">
        <h2 className="text-4xl font-bold text-gray-800 mb-6 text-center">
          Add New Income
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Source
            </label>
            <input
              type="text"
              name="source"
              value={formData.source}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition duration-200"
              placeholder="Enter income source"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Amount (₹)
            </label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition duration-200"
              placeholder="Enter amount"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Date
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition duration-200"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-500 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
          >
            Add Income
          </button>
        </form>
      </div>
    </div>
  );
}
