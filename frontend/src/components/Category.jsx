import { useState, useEffect } from "react";
import axios from "axios";
import AddCategory from "./AddCategory";
import EditCategory from "./EditCategory";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar"; // Ensure you have Sidebar component imported
import "./Category.css"; // You can adjust the styles in this file

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, [categories]);

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
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCategories(response.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.removeItem("authToken");
        navigate("/login");
      } else {
        setError(error.response?.data?.message || "Error fetching categories");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryAdded = (newCategory) => {
    setCategories([...categories, newCategory]);
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setShowEditModal(true);
  };

  const handleSaveCategory = async (updatedCategory) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        navigate("/login");
        return;
      }

      const response = await axios.put(
        `http://localhost:3000/api/category/update/${updatedCategory._id}`,
        { name: updatedCategory.name },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updatedCatFromServer = response.data;

      setCategories((prevCategories) =>
        prevCategories.map((cat) =>
          cat._id === updatedCatFromServer._id
            ? { ...cat, name: updatedCatFromServer.name }
            : cat
        )
      );

      setShowEditModal(false);
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  const handleDeleteCategory = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        navigate("/login");
        return;
      }

      await axios.delete(
        `http://localhost:3000/api/category/delete/${categoryToDelete._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCategories((prevCategories) =>
        prevCategories.filter((cat) => cat._id !== categoryToDelete._id)
      );
      setShowDeleteConfirm(false);
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900">
        <p className="text-gray-300 text-lg">Loading categories...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900">
        <p className="text-red-500 text-lg">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-900 text-gray-200">
      <Sidebar
        categories={categories}
        loading={loading}
        showCategories={true}
        setShowCategories={() => {}}
      />
      <div className="p-6 bg-gray-800 flex-grow">
        <h1 className="text-4xl font-bold mb-6 text-white">Categories</h1>
        <AddCategory onCategoryAdded={handleCategoryAdded} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {categories.map((category) => (
            <div
              key={category._id}
              className="bg-gray-700 shadow-lg rounded-lg p-5 transition-transform transform hover:scale-105"
            >
              <h2 className="text-xl font-semibold text-white mb-2">
                {category.name}
              </h2>
              <p className="text-gray-300 mb-4">
                Manage your category details and settings.
              </p>
              <div className="flex justify-between">
                <button
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition duration-200"
                  onClick={() => handleEditCategory(category)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-200"
                  onClick={() => {
                    setCategoryToDelete(category);
                    setShowDeleteConfirm(true);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {showEditModal && (
          <EditCategory
            category={editingCategory}
            onClose={() => setShowEditModal(false)}
            onSave={handleSaveCategory}
          />
        )}

        {showDeleteConfirm && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 shadow-lg max-w-sm w-full">
              <h2 className="text-lg font-bold text-gray-800">
                Are you sure you want to delete this category?
              </h2>
              <p className="text-gray-600">This action cannot be undone.</p>
              <div className="flex justify-between mt-4">
                <button
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-200"
                  onClick={handleDeleteCategory}
                >
                  Yes, Delete
                </button>
                <button
                  className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition duration-200"
                  onClick={() => setShowDeleteConfirm(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Category;
