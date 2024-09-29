import { useEffect, useState } from "react";
import Sidebar from "./SideBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  Title,
  BarElement,
  CategoryScale,
  LinearScale
);

export default function Dashboard() {
  const [categories, setCategories] = useState([]);
  const [recentExpenses, setRecentExpenses] = useState([]);
  const [recentIncome, setRecentIncome] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCategories, setShowCategories] = useState(false);
  const [totalIncome, setTotalIncome] = useState(0.0);
  const [totalExpense, setTotalExpense] = useState(0.0);
  const [balance, setBalance] = useState(0.0);
  const navigate = useNavigate();
  const apiURL = import.meta.env.VITE_BASE_URL;

  const totalIncomeCalculator = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        navigate("/login");
        return;
      }

      const response = await axios.get(`${apiURL}/api/income/get/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      let total = response.data.reduce((acc, inc) => acc + inc.amount, 0);
      setTotalIncome(total);
    } catch (error) {
      console.log(error.message);
    }
  };

  const totalExpenseCalculator = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        navigate("/login");
        return;
      }

      const response = await axios.get(`${apiURL}/api/expense/user/get`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      let total = response.data.reduce((acc, exp) => acc + exp.amount, 0);
      setTotalExpense(total);
    } catch (error) {
      console.log(error.message);
    }
  };

  const balanceCalculator = async () => {
    setBalance(totalIncome - totalExpense);
  };

  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        navigate("/login");
        return;
      }

      const response = await axios.get(`${apiURL}/api/category/get`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCategories(response.data);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchRecentExpenses = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        navigate("/login");
        return;
      }

      const response = await axios.get(
        `${apiURL}/api/expense/user/get/recent`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setRecentExpenses(response.data);
    } catch (error) {
      console.log("Failed to fetch recent expenses:", error.message);
    }
  };

  const fetchRecentIncome = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        navigate("/login");
        return;
      }

      const response = await axios.get(`${apiURL}/api/income/get/recent`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRecentIncome(response.data);
    } catch (error) {
      console.log("Failed to fetch recent income:", error.message);
    }
  };

  useEffect(() => {
    balanceCalculator();
  }, [totalExpense, totalIncome]);

  useEffect(() => {
    fetchCategories();
    fetchRecentExpenses();
    totalIncomeCalculator();
    totalExpenseCalculator();
    fetchRecentIncome();
  }, []);

  const pieData = {
    labels: ["Income", "Expenses", "Balance"],
    datasets: [
      {
        label: "Financial Summary",
        data: [totalIncome, totalExpense, balance],
        backgroundColor: ["#4F46E5", "#F472B6", "#3B82F6"], // Updated colors
        borderColor: ["#4F46E5", "#F472B6", "#3B82F6"],
        borderWidth: 1,
        hoverOffset: 4,
      },
    ],
  };

  const barData = {
    labels: ["Income", "Expenses", "Balance"],
    datasets: [
      {
        label: "Amount in ₹",
        data: [totalIncome, totalExpense, balance],
        backgroundColor: ["#4F46E5", "#F472B6", "#3B82F6"], // Updated colors
        borderColor: ["#4F46E5", "#F472B6", "#3B82F6"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-900">
      {" "}
      {/* Updated Background and Text color */}
      <Sidebar
        categories={categories}
        loading={loading}
        showCategories={showCategories}
        setShowCategories={setShowCategories}
      />
      <div className="flex-grow p-10 bg-gray-200">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[
            // Updated Cards
            {
              title: "Income",
              amount: `₹${totalIncome}`,
              color: "bg-gradient-to-r from-blue-500 to-indigo-500", // Updated color gradient
              imgSrc: "/income.png",
            },
            {
              title: "Expenses",
              amount: `₹${totalExpense}`,
              color: "bg-gradient-to-r from-pink-500 to-red-500", // Updated color gradient
              imgSrc: "/expenses.png",
            },
            {
              title: "Balance",
              amount: `₹${balance}`,
              color: "bg-gradient-to-r from-green-500 to-teal-500", // Updated color gradient
              imgSrc: "/balance.png",
            },
          ].map((card, index) => (
            <div
              key={index}
              className={`shadow-lg rounded-lg p-6 flex items-center justify-between transition-transform transform hover:scale-105 hover:shadow-2xl text-white ${card.color}`}
            >
              <div>
                <h2 className="text-xl font-medium">{card.title}</h2>
                <p className="text-4xl font-bold">{card.amount}</p>
              </div>
              <img src={card.imgSrc} alt={card.title} className="w-12 h-12" />
            </div>
          ))}
        </div>

        {/* Chart Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Pie Chart */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            {" "}
            {/* Updated background color */}
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Financial Overview (Pie Chart)
            </h2>
            <div className="h-56 flex items-center justify-center">
              <Pie
                data={pieData}
                options={{
                  plugins: { legend: { labels: { color: "black" } } }, // Updated legend color
                }}
              />
            </div>
          </div>

          {/* Bar Chart */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            {" "}
            {/* Updated background color */}
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Financial Overview (Bar Chart)
            </h2>
            <div className="h-56 flex items-center justify-center">
              <Bar
                data={barData}
                options={{
                  scales: {
                    y: { ticks: { color: "black" } }, // Updated tick color
                    x: { ticks: { color: "black" } }, // Updated tick color
                  },
                  plugins: { legend: { labels: { color: "black" } } }, // Updated legend color
                }}
              />
            </div>
          </div>
        </div>

        {/* Recent expenses */}
        <div className="bg-white shadow-lg rounded-lg p-6 mt-8">
          {" "}
          {/* Updated background color */}
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Recent Expenses
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left">
              <thead>
                <tr className="border-b border-gray-600 text-center">
                  {["Description", "Amount", "Date", "Category"].map(
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
              <tbody className="text-center">
                {recentExpenses.length === 0 ? (
                  <tr>
                    <td
                      colSpan="4"
                      className="text-center py-4 px-6 text-gray-400"
                    >
                      No recent expenses available.
                    </td>
                  </tr>
                ) : (
                  recentExpenses.map((expense) => (
                    <tr
                      key={expense.id}
                      className="border-b border-gray-200 hover:bg-gray-100"
                    >
                      <td className="py-4 px-6">{expense.description}</td>
                      <td className="py-4 px-6 text-red-700 font-normal">
                        ₹{expense.amount}
                      </td>
                      <td className="py-4 px-6">
                        {new Date(expense.expenseDate).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-6">{expense.category.name}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6 mt-8">
          {" "}
          {/* Updated background color */}
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Recent Income
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left ">
              <thead>
                <tr className="border-b border-gray-600 text-center">
                  {["Source", "Amount", "Date"].map((header) => (
                    <th
                      key={header}
                      className="py-3 px-6 text-sm font-medium text-gray-600 uppercase tracking-wider"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-center">
                {recentIncome.length === 0 ? (
                  <tr>
                    <td
                      colSpan="4"
                      className="text-center py-4 px-6 text-gray-400"
                    >
                      No recent income available.
                    </td>
                  </tr>
                ) : (
                  recentIncome.map((income) => (
                    <tr
                      key={income.id}
                      className="border-b border-gray-200 hover:bg-gray-100"
                    >
                      <td className="py-4 px-6">{income.source}</td>
                      <td className="py-4 px-6 text-red-700 font-normal">
                        ₹{income.amount}
                      </td>
                      <td className="py-4 px-6">
                        {new Date(income.date).toLocaleDateString()}
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
