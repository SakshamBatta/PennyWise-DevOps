import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Expense() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchExpenses = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        navigate("/login");
        return;
      }

      const response = await axios.get(
        "http://localhost:3000/api/expense/user/get",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setExpenses(response.data);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("authToken");
      await axios.delete(`http://localhost:3000/api/expense/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setExpenses(expenses.filter((txn) => txn._id !== id));
    } catch (error) {
      console.error("Failed to delete expense:", error.message);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <div className="flex min-h-screen bg-white text-gray-800">
      <Sidebar />
      <div className="flex-grow p-10  bg-gray-200">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 ">
          <h2 className="text-2xl font-bold text-gray-800">Expenses</h2>
          <button
            className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500"
            onClick={() => navigate("/add-expense")}
          >
            <FaPlus className="mr-2" /> Add Expense
          </button>
        </div>

        {/* Expenses Table */}
        <div className="bg-white shadow-lg rounded-lg p-6 ">
          <h3 className="text-xl font-bold text-gray-800 mb-4">All Expenses</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left">
              <thead>
                <tr className="bg-gray-200 border-b border-gray-300">
                  {["Description", "Amount", "Date", "Category", "Actions"].map(
                    (header) => (
                      <th
                        key={header}
                        className="py-3 px-6 text-sm font-medium text-gray-600 uppercase tracking-wider"
                      >
                        {header}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="5" className="text-center py-4 text-gray-400">
                      Loading...
                    </td>
                  </tr>
                ) : expenses.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-4 text-gray-400">
                      No expenses found.
                    </td>
                  </tr>
                ) : (
                  expenses.map((txn) => (
                    <tr key={txn._id} className="hover:bg-gray-100">
                      <td className="py-4 px-6 text-sm text-gray-800">
                        {txn.description}
                      </td>
                      <td
                        className={`py-4 px-6 text-sm ${
                          txn.amount < 0 ? "text-red-500" : "text-red-500"
                        }`}
                      >
                        {txn.amount < 0
                          ? `₹${Math.abs(txn.amount)}`
                          : `₹${txn.amount}`}
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-600">
                        {new Date(txn.expenseDate).toLocaleDateString()}{" "}
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-600">
                        {txn.category.name}
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-600 flex items-center">
                        <button
                          className="text-blue-600 hover:text-blue-500 mr-3"
                          onClick={() => navigate(`/edit-expense/${txn._id}`)}
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="text-red-600 hover:text-red-500"
                          onClick={() => handleDelete(txn._id)}
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
    </div>
  );
}
