import { useState, useEffect } from "react";
import axios from "axios";
import AddCategory from "./AddCategory";
import EditCategory from "./EditCategory";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import "./Category.css"; // Adjust styles if needed

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
  }, []);

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
      const response = await axios.put(
        `http://localhost:3000/api/category/update/${updatedCategory.id}`,
        updatedCategory,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCategories(
        categories.map((cat) =>
          cat.id === response.data.id ? response.data : cat
        )
      );
    } catch (error) {
      console.error("Error updating category:", error);
    } finally {
      setShowEditModal(false);
      setEditingCategory(null);
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      const token = localStorage.getItem("authToken");
      await axios.delete(
        `http://localhost:3000/api/category/delete/${categoryId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCategories(categories.filter((cat) => cat.id !== categoryId));
    } catch (error) {
      console.error("Error deleting category:", error);
    } finally {
      setShowDeleteConfirm(false);
      setCategoryToDelete(null);
    }
  };

  return (
    <div className="flex min-h-screen bg-blue-50 text-blue-800">
      <Sidebar categories={categories} loading={loading} />
      <div className="flex-grow p-10 bg-gray-200">
        <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
        <AddCategory onCategoryAdded={handleCategoryAdded} />
        {loading ? (
          <p className="text-blue-600">Loading categories...</p>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : (
          <div className="overflow-x-auto mt-4">
            <table className="min-w-full text-left bg-white rounded-lg shadow">
              <thead>
                <tr className="bg-gray-200">
                  {["Name", "Actions"].map((header) => (
                    <th
                      key={header}
                      className="py-3 px-6 text-sm text-center font-medium text-gray-700 uppercase tracking-wider"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {categories.length === 0 ? (
                  <tr>
                    <td
                      colSpan="2"
                      className="text-center py-4 px-6 text-gray-400"
                    >
                      No categories available.
                    </td>
                  </tr>
                ) : (
                  categories.map((category) => (
                    <tr
                      key={category.id}
                      className="border-b border-gray-200 hover:bg-gray-100 text-center transition duration-200"
                    >
                      <td className="py-4 px-6">{category.name}</td>
                      <td className="py-4 px-6">
                        <button
                          className="bg-blue-500 text-white font-semibold py-1 px-3 rounded mr-2 transition duration-200 hover:bg-blue-600"
                          onClick={() => handleEditCategory(category)}
                        >
                          Edit
                        </button>
                        <button
                          className="bg-red-500 text-white font-semibold py-1 px-3 rounded transition duration-200 hover:bg-red-600"
                          onClick={() => {
                            setCategoryToDelete(category.id);
                            setShowDeleteConfirm(true);
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {showEditModal && (
        <EditCategory
          category={editingCategory}
          onSave={handleSaveCategory}
          onClose={() => setShowEditModal(false)}
        />
      )}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-lg font-semibold">Confirm Delete</h2>
            <p>Are you sure you want to delete this category?</p>
            <div className="mt-4">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded mr-2 transition duration-200 hover:bg-red-600"
                onClick={() => handleDeleteCategory(categoryToDelete)}
              >
                Delete
              </button>
              <button
                className="bg-gray-300 text-black px-4 py-2 rounded transition duration-200 hover:bg-gray-400"
                onClick={() => setShowDeleteConfirm(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Category;
