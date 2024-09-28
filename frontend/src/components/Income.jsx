import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";

export default function Income() {
  const [incomeEntries, setIncomeEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [amount, setAmount] = useState("");
  const [source, setSource] = useState("");
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const navigate = useNavigate();

  // Fetch income entries
  const fetchIncomeEntries = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        navigate("/login");
        return;
      }

      const response = await axios.get(
        "http://localhost:3000/api/income/get/all",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setIncomeEntries(response.data);
      setLoading(false);
    } catch (error) {
      console.log("Failed to fetch income entries:", error.message);
    }
  };

  useEffect(() => {
    fetchIncomeEntries();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("authToken");
      await axios.delete(`http://localhost:3000/api/income/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setIncomeEntries(incomeEntries.filter((txn) => txn._id !== id));
    } catch (error) {
      console.error("Failed to delete transaction:", error.message);
    }
  };

  const handleEdit = (entry) => {
    setSelectedEntry(entry);
    setAmount(entry.amount);
    setSource(entry.source);
    setModalVisible(true);
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("authToken");
      await axios.put(
        `http://localhost:3000/api/income/update/${selectedEntry._id}`,
        { amount, source },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Update local state
      setIncomeEntries((prevEntries) =>
        prevEntries.map((entry) =>
          entry._id === selectedEntry._id ? { ...entry, amount, source } : entry
        )
      );

      setModalVisible(false);
    } catch (error) {
      console.error("Failed to update transaction:", error.message);
    }
  };

  return (
    <div className="flex min-h-screen bg-white text-gray-800">
      <Sidebar loading={loading} />
      <div className="flex-grow p-10 bg-gray-200">
        {/* Add Income Button */}
        <div className="mb-6 text-center">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Income</h2>
            <button
              className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500"
              onClick={() => navigate("/add-income")}
            >
              <FaPlus className="mr-2" /> Add Income
            </button>
          </div>
        </div>

        {/* Income Entries Table */}
        <div className=" shadow-lg rounded-lg p-8 mt-6 bg-white">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Income Entries
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left">
              <thead>
                <tr className="bg-gray-200 border-b border-gray-300">
                  {["Source", "Amount", "Date", "Action"].map((header) => (
                    <th
                      key={header}
                      className="py-3 px-6 text-sm font-medium text-gray-600 uppercase tracking-wider"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {incomeEntries.length === 0 ? (
                  <tr>
                    <td
                      colSpan="4"
                      className="text-center py-4 px-6 text-gray-600"
                    >
                      No income entries available.
                    </td>
                  </tr>
                ) : (
                  incomeEntries.map((entry, index) => (
                    <tr key={index} className="hover:bg-gray-200 transition">
                      <td className="py-4 px-6 text-sm text-gray-800">
                        {entry.source}
                      </td>
                      <td className="py-4 px-6 text-sm text-green-600">
                        ₹{entry.amount}
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-600">
                        {new Date(entry.date).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-600 flex items-center">
                        <button
                          className="text-blue-600 hover:text-blue-500 mr-3"
                          onClick={() => handleEdit(entry)}
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="text-red-600 hover:text-red-500"
                          onClick={() => handleDelete(entry._id)}
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Edit Income Modal */}
      {modalVisible && (
        <>
          {/* Overlay */}
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40" />
          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Edit Income
              </h3>
              <div>
                <label className="block text-gray-700 mb-2">Source</label>
                <input
                  type="text"
                  className="w-full p-2 rounded-lg bg-gray-200 text-gray-800 mb-4"
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                />
                <label className="block text-gray-700 mb-2">Amount</label>
                <input
                  type="number"
                  className="w-full p-2 rounded-lg bg-gray-200 text-gray-800 mb-4"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
              <div className="flex justify-between">
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500"
                  onClick={handleUpdate}
                >
                  Update
                </button>
                <button
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-500"
                  onClick={() => setModalVisible(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
