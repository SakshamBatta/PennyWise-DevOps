import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Income() {
  const [incomes, setIncomes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const apiURL = import.meta.env.VITE_BASE_URL;

  // Fetch income history
  const fetchIncomes = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        navigate("/login");
        return;
      }

      const response = await axios.get(`${apiURL}/api/income`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setIncomes(response.data);
    } catch (error) {
      console.log("Failed to fetch income data:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIncomes();
  }, []);

  return (
    <div className="flex-grow p-10 bg-gray-800">
      <h2 className="text-2xl font-bold text-gray-200 mb-4">Income History</h2>
      {loading ? (
        <p className="text-gray-400">Loading...</p>
      ) : (
        <div className="bg-gray-700 rounded-lg p-6">
          <table className="min-w-full text-left">
            <thead>
              <tr className="border-b border-gray-600">
                {["Description", "Amount", "Date"].map((header) => (
                  <th
                    key={header}
                    className="py-3 px-6 text-sm font-medium text-gray-400 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {incomes.length === 0 ? (
                <tr>
                  <td
                    colSpan="3"
                    className="text-center py-4 px-6 text-gray-400"
                  >
                    No income records found.
                  </td>
                </tr>
              ) : (
                incomes.map((income, index) => (
                  <tr key={index} className="hover:bg-gray-600">
                    <td className="py-4 px-6 text-sm text-gray-200">
                      {income.description}
                    </td>
                    <td className="py-4 px-6 text-sm text-green-300">
                      ₹{income.amount}
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-400">
                      {new Date(income.date).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
