import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [categories, setCategories] = useState([]);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCategories, setShowCategories] = useState(false);
  const navigate = useNavigate();

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        navigate("/login");
        return;
      }

      const response = await axios.get(
        "http://localhost:3000/api/category/get",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCategories(response.data);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch recent transactions
  const fetchRecentTransactions = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        navigate("/login");
        return;
      }

      const response = await axios.get(
        "http://localhost:3000/api/transaction/user/get/recent", // Adjust the endpoint to match your backend
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setRecentTransactions(response.data); // Assuming response.data contains the recent transactions
    } catch (error) {
      console.log("Failed to fetch recent transactions:", error.message);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchRecentTransactions(); // Fetch recent transactions on component mount
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-900 text-gray-200">
      <Sidebar
        categories={categories}
        loading={loading}
        showCategories={showCategories}
        setShowCategories={setShowCategories}
      />
      <div className="flex-grow p-10 bg-gray-800">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
          {[
            {
              title: "Income",
              amount: "₹0.00",
              change: "+12% from last month",
              icon: <FaArrowUp className="mr-1" />,
              color: "bg-green-600",
              imgSrc: "/income.png",
            },
            {
              title: "Expenses",
              amount: "₹0.00",
              change: "-8% from last month",
              icon: <FaArrowDown className="mr-1" />,
              color: "bg-red-600",
              imgSrc: "/expenses.png",
            },
            {
              title: "Balance",
              amount: "₹0.00",
              change: "+5% from last month",
              icon: <FaArrowUp className="mr-1" />,
              color: "bg-blue-600",
              imgSrc: "/balance.png",
            },
          ].map((card, index) => (
            <div
              key={index}
              className={`shadow-lg rounded-lg p-4 flex items-center justify-between transition-transform transform hover:scale-105 hover:shadow-xl text-white ${card.color}`}
            >
              <div>
                <h2 className="text-lg font-medium">{card.title}</h2>
                <p className="text-3xl font-bold">{card.amount}</p>
                <div className="flex items-center mt-2">
                  {card.icon}
                  <span className="text-sm">{card.change}</span>
                </div>
              </div>
              <img src={card.imgSrc} alt={card.title} className="w-12 h-12" />
            </div>
          ))}
        </div>

        {/* Chart Section */}
        <div className="bg-gray-700 shadow-lg rounded-lg p-4 mb-4">
          <h2 className="text-lg font-bold text-gray-100 mb-2">
            Performance Overview
          </h2>
          <div className="h-48 bg-gray-600 flex items-center justify-center">
            <span className="text-gray-400">
              Chart will be implemented here
            </span>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-gray-700 shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-100 mb-4">
            Recent Transactions
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left">
              <thead>
                <tr className="border-b border-gray-600">
                  {["Description", "Amount", "Date", "Category"].map(
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
                {recentTransactions.length === 0 ? (
                  <tr>
                    <td
                      colSpan="4"
                      className="text-center py-4 px-6 text-gray-400"
                    >
                      No recent transactions available.
                    </td>
                  </tr>
                ) : (
                  recentTransactions.map((transaction, index) => (
                    <tr key={index} className="hover:bg-gray-600">
                      <td className="py-4 px-6 text-sm text-gray-200">
                        {transaction.description}
                      </td>
                      <td
                        className={`py-4 px-6 text-sm ${
                          transaction.amount < 0
                            ? "text-red-300"
                            : "text-green-300"
                        }`}
                      >
                        {transaction.amount < 0
                          ? `₹${Math.abs(transaction.amount)}`
                          : `₹${transaction.amount}`}
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-400">
                        {new Date(
                          transaction.transactionDate
                        ).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-400">
                        {transaction.category.name}
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
