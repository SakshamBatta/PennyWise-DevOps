import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
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
  const [loading, setLoading] = useState(true);
  const [showCategories, setShowCategories] = useState(false);
  const [totalIncome, setTotalIncome] = useState(0.0);
  const [totalExpense, setTotalExpense] = useState(0.0);
  const [balance, setBalance] = useState(0.0);
  const navigate = useNavigate();

  const totalIncomeCalculator = async () => {
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
      let total = 0;
      response.data.map((inc) => {
        total += inc.amount;
      });

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

      const response = await axios.get(
        "http://localhost:3000/api/expense/user/get",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      let total = 0;
      response.data.map((exp) => {
        total += exp.amount;
      });

      setTotalExpense(total);
    } catch (error) {
      console.log(error.message);
    }
  };

  const balanceCalculator = async () => {
    let balance = totalIncome - totalExpense;
    setBalance(balance);
  };

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

  const fetchRecentExpenses = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        navigate("/login");
        return;
      }

      const response = await axios.get(
        "http://localhost:3000/api/expense/user/get/recent",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setRecentExpenses(response.data);
    } catch (error) {
      console.log("Failed to fetch recent expenses:", error.message);
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
  }, []);

  const pieData = {
    labels: ["Income", "Expenses", "Balance"],
    datasets: [
      {
        label: "Financial Summary",
        data: [totalIncome, totalExpense, balance],
        backgroundColor: ["#00C9A7", "#FF6F61", "#3B82F6"],
        borderColor: ["#00C9A7", "#FF6F61", "#3B82F6"],
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
        backgroundColor: ["#00C9A7", "#FF6F61", "#3B82F6"],
        borderColor: ["#00C9A7", "#FF6F61", "#3B82F6"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="flex min-h-screen bg-gray-800 text-gray-100">
      <Sidebar
        categories={categories}
        loading={loading}
        showCategories={showCategories}
        setShowCategories={setShowCategories}
      />
      <div className="flex-grow p-10">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[
            {
              title: "Income",
              amount: `₹${totalIncome}`,
              color: "bg-gradient-to-r from-teal-400 to-green-500",
              imgSrc: "/income.png",
            },
            {
              title: "Expenses",
              amount: `₹${totalExpense}`,
              color: "bg-gradient-to-r from-red-500 to-pink-600",
              imgSrc: "/expenses.png",
            },
            {
              title: "Balance",
              amount: `₹${balance}`,
              color: "bg-gradient-to-r from-blue-500 to-indigo-600",
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
          <div className="bg-gray-700 shadow-lg rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-100 mb-4">
              Financial Overview (Pie Chart)
            </h2>
            <div className="h-56 flex items-center justify-center">
              <Pie
                data={pieData}
                options={{
                  plugins: { legend: { labels: { color: "white" } } },
                }}
              />
            </div>
          </div>

          {/* Bar Chart */}
          <div className="bg-gray-700 shadow-lg rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-100 mb-4">
              Financial Overview (Bar Chart)
            </h2>
            <div className="h-56 flex items-center justify-center">
              <Bar
                data={barData}
                options={{
                  scales: {
                    y: { ticks: { color: "white" } },
                    x: { ticks: { color: "white" } },
                  },
                  plugins: { legend: { labels: { color: "white" } } },
                }}
              />
            </div>
          </div>
        </div>

        {/* Recent expenses */}
        <div className="bg-gray-700 shadow-lg rounded-lg p-6 mt-8">
          <h2 className="text-xl font-semibold text-gray-100 mb-4">
            Recent Expenses
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
                  recentExpenses.map((expense, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-600 hover:bg-gray-600 transition-colors"
                    >
                      <td className="py-4 px-6 text-gray-300">
                        {expense.description}
                      </td>
                      <td className="py-4 px-6 text-gray-300">
                        ₹{expense.amount}
                      </td>
                      <td className="py-4 px-6 text-gray-300">
                        {new Date(expense.expenseDate).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-6 text-gray-300">
                        {expense.category.name}
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
