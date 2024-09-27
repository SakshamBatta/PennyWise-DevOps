import { useEffect, useState } from "react";
import Sidebar from "./SideBar";
import Logout from "./Logout";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Dashboard() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Function to fetch categories
  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        // Redirect to login if no token is found
        navigate("/login");
        return;
      }

      const response = await axios.get(
        "http://localhost:3000/api/category/get",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCategories(response.data);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-grow p-10 bg-gradient-to-b from-gray-50 to-gray-200">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-800">
            Dashboard Overview
          </h1>
          <Logout />
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Income Card */}
          <div className="bg-green-500 shadow-lg rounded-lg p-6 flex items-center justify-between transition-transform transform hover:scale-105 hover:shadow-xl text-white">
            <div>
              <h2 className="text-lg font-medium">Income</h2>
              <p className="text-3xl font-bold">$0.00</p>
              <div className="flex items-center mt-2">
                <FaArrowUp className="mr-1" />
                <span className="text-sm">+12% from last month</span>
              </div>
            </div>
            <img src="/income.png" alt="Income" className="w-12 h-12" />
          </div>

          {/* Expenses Card */}
          <div className="bg-red-500 shadow-lg rounded-lg p-6 flex items-center justify-between transition-transform transform hover:scale-105 hover:shadow-xl text-white">
            <div>
              <h2 className="text-lg font-medium">Expenses</h2>
              <p className="text-3xl font-bold">$0.00</p>
              <div className="flex items-center mt-2">
                <FaArrowDown className="mr-1" />
                <span className="text-sm">-8% from last month</span>
              </div>
            </div>
            <img src="/expenses.png" alt="Expenses" className="w-12 h-12" />
          </div>

          {/* Balance Card */}
          <div className="bg-blue-500 shadow-lg rounded-lg p-6 flex items-center justify-between transition-transform transform hover:scale-105 hover:shadow-xl text-white">
            <div>
              <h2 className="text-lg font-medium">Balance</h2>
              <p className="text-3xl font-bold">$0.00</p>
              <div className="flex items-center mt-2">
                <FaArrowUp className="mr-1" />
                <span className="text-sm">+5% from last month</span>
              </div>
            </div>
            <img src="/balance.png" alt="Balance" className="w-12 h-12" />
          </div>
        </div>

        {/* Charts and Category Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Expense Chart Placeholder */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Monthly Expenses Overview
            </h2>
            <div className="h-48 bg-gray-200 flex items-center justify-center rounded-md">
              <p className="text-gray-500">[Expense Chart Placeholder]</p>
            </div>
          </div>

          {/* Category Overview */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Categories</h2>
            {loading ? (
              <p className="text-gray-500">Loading categories...</p>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                {categories.map((category) => (
                  <div
                    key={category.id}
                    className="bg-blue-300 border border-gray-300 rounded-md p-4 flex items-center justify-center transition-transform transform hover:scale-105 hover:shadow-lg"
                  >
                    <p className="text-gray-800 font-semibold text-center">
                      {category.name}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Recent Transactions
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left">
              <thead>
                <tr className="border-b">
                  <th className="py-3 px-6 text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="py-3 px-6 text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="py-3 px-6 text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="py-3 px-6 text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-100">
                  <td className="py-4 px-6 text-sm text-gray-900">Groceries</td>
                  <td className="py-4 px-6 text-sm text-red-600">-$50.00</td>
                  <td className="py-4 px-6 text-sm text-gray-500">
                    2024-09-26
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-500">Food</td>
                </tr>
                <tr className="hover:bg-gray-100">
                  <td className="py-4 px-6 text-sm text-gray-900">
                    Freelance Payment
                  </td>
                  <td className="py-4 px-6 text-sm text-green-600">+$500.00</td>
                  <td className="py-4 px-6 text-sm text-gray-500">
                    2024-09-25
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-500">Income</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
