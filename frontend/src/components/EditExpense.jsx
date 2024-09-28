import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function EditExpense() {
  const [formData, setFormData] = useState({
    description: "",
    amount: 0,
    expenseDate: "",
    category: "",
  });
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams(); // Fetch the expense ID from the URL

  // Fetch the available categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(
          "http://localhost:3000/api/category/get",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Failed to fetch categories:", error.message);
      }
    };

    fetchCategories();
  }, []);

  // Fetch the current expense details
  useEffect(() => {
    const fetchExpense = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(
          `http://localhost:3000/api/expense/get/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setFormData(response.data); // Populate form with expense data
      } catch (error) {
        console.error("Failed to fetch expense:", error.message);
      }
    };

    fetchExpense();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("authToken");
      await axios.put(
        `http://localhost:3000/api/expense/update/${id}`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      navigate("/expense"); // Redirect after editing
    } catch (error) {
      console.error("Failed to update expense:", error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 flex items-center justify-center">
      <div className="w-full max-w-xl bg-gray-800 p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-gray-100 mb-6 text-center">
          Edit expense
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-gray-400 mb-2 text-sm uppercase tracking-wide">
              Description
            </label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-gray-700 text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              placeholder="Enter description"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-400 mb-2 text-sm uppercase tracking-wide">
              Amount (₹)
            </label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-gray-700 text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              placeholder="Enter amount"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-400 mb-2 text-sm uppercase tracking-wide">
              Date
            </label>
            <input
              type="date"
              name="expenseDate"
              value={formData.expenseDate}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-gray-700 text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-400 mb-2 text-sm uppercase tracking-wide">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-gray-700 text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              required
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-500 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
