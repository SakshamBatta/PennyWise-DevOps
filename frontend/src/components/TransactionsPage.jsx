import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchTransactions = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        navigate("/login");
        return;
      }

      const response = await axios.get(
        "http://localhost:3000/api/transaction/user/get", // Your API endpoint
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setTransactions(response.data); // Set the transactions with populated category
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("authToken");
      await axios.delete(`http://localhost:3000/api/transaction/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTransactions(transactions.filter((txn) => txn._id !== id));
    } catch (error) {
      console.error("Failed to delete transaction:", error.message);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-900 text-gray-200">
      <Sidebar />
      <div className="flex-grow p-10 bg-gray-800">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-100">Transactions</h2>
          <button
            className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500"
            onClick={() => navigate("/add-transaction")}
          >
            <FaPlus className="mr-2" /> Add Transaction
          </button>
        </div>

        {/* Transactions Table */}
        <div className="bg-gray-700 shadow-lg rounded-lg p-6">
          <h3 className="text-xl font-bold text-gray-100 mb-4">
            All Transactions
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left">
              <thead>
                <tr className="border-b border-gray-600">
                  {["Description", "Amount", "Date", "Category", "Actions"].map(
                    (header) => (
                      <th
                        key={header}
                        className="py-3 px-6 text-sm font-medium text-gray-400 uppercase tracking-wider"
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
                ) : transactions.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-4 text-gray-400">
                      No transactions found.
                    </td>
                  </tr>
                ) : (
                  transactions.map((txn) => (
                    <tr key={txn._id} className="hover:bg-gray-600">
                      <td className="py-4 px-6 text-sm text-gray-200">
                        {txn.description}
                      </td>
                      <td
                        className={`py-4 px-6 text-sm ${
                          txn.amount > 0 ? "text-green-300" : "text-red-300"
                        }`}
                      >
                        {txn.amount < 0
                          ? `₹${Math.abs(txn.amount)}`
                          : `₹${txn.amount}`}
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-400">
                        {new Date(txn.transactionDate).toLocaleDateString()}{" "}
                        {/* Updated field name */}
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-400">
                        {txn.category.name} {/* Display the category name */}
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-400 flex items-center">
                        <button
                          className="text-blue-500 hover:text-blue-400 mr-3"
                          onClick={() =>
                            navigate(`/edit-transaction/${txn._id}`)
                          }
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="text-red-500 hover:text-red-400"
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
