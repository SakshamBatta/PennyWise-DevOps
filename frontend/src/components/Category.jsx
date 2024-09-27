import { useState, useEffect } from "react";
import axios from "axios";
import AddCategory from "./AddCategory";
import EditCategory from "./EditCategory"; // Import the new EditCategory component
import { useNavigate } from "react-router-dom"; // Ensure react-router-dom is used
import "./Category.css";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null); // State for tracking the category being edited
  const [showEditModal, setShowEditModal] = useState(false); // State for showing the edit modal
  const [categoryToDelete, setCategoryToDelete] = useState(null); // State for the category to delete
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false); // State for showing delete confirmation
  const navigate = useNavigate(); // Use navigate for routing

  // Fetch categories when component mounts
  useEffect(() => {
    fetchCategories();
  }, [categories]);

  // Fetch categories from API
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
      if (error.response && error.response.status === 401) {
        // If token is invalid, clear it and redirect to login
        localStorage.removeItem("authToken");
        navigate("/login");
      } else {
        setError(error.response?.data?.message || "Error fetching categories");
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle adding new category
  const handleCategoryAdded = (newCategory) => {
    setCategories([...categories, newCategory]); // Add new category to the list
  };

  // Handle editing a category
  const handleEditCategory = (category) => {
    setEditingCategory(category); // Set category to be edited
    setShowEditModal(true); // Open the edit modal
  };

  // Handle saving updated category
  const handleSaveCategory = async (updatedCategory) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        navigate("/login");
        return;
      }

      // Make API request to update category
      const response = await axios.put(
        `http://localhost:3000/api/category/update/${updatedCategory._id}`,
        { name: updatedCategory.name },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Log the response to verify updated category data
      console.log("Updated Category from Server:", response.data);

      const updatedCatFromServer = response.data;

      // Log the previous state for debugging
      console.log("Previous categories:", categories);

      // Update the local state of categories
      setCategories((prevCategories) =>
        prevCategories.map((cat) =>
          cat._id === updatedCatFromServer._id
            ? { ...cat, name: updatedCatFromServer.name } // Update name locally
            : cat
        )
      );

      // Log the updated state for debugging
      console.log("Updated categories   :", categories);

      setShowEditModal(false); // Close the modal after save
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  // Handle deletion
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
      // Remove the deleted category from the state
      setCategories((prevCategories) =>
        prevCategories.filter((cat) => cat._id !== categoryToDelete._id)
      );
      setShowDeleteConfirm(false); // Close delete confirmation modal
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  // UI for loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-600 text-lg">Loading categories...</p>
      </div>
    );
  }

  // UI for error state
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-600 text-lg">Error: {error}</p>
      </div>
    );
  }

  // Main UI
  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">Categories</h1>
      <AddCategory onCategoryAdded={handleCategoryAdded} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {categories.map((category) => (
          <div
            key={category._id}
            className="bg-white shadow-lg rounded-lg p-5 transition-transform transform hover:scale-105"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              {category.name}
            </h2>
            <p className="text-gray-700 mb-4">
              Manage your category details and settings.
            </p>
            <div className="flex justify-between">
              <button
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition duration-200"
                onClick={() => handleEditCategory(category)} // Trigger edit
              >
                Edit
              </button>
              <button
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-200"
                onClick={() => {
                  setCategoryToDelete(category); // Set the category to delete
                  setShowDeleteConfirm(true); // Show confirmation modal
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <EditCategory
          category={editingCategory}
          onClose={() => setShowEditModal(false)} // Close the edit modal
          onSave={handleSaveCategory} // Save changes
        />
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="modal">
          <div className="modal-content">
            <h2>Are you sure you want to delete this category?</h2>
            <p>This action cannot be undone.</p>
            <div className="flex justify-between mt-4">
              <button
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-200"
                onClick={handleDeleteCategory} // Confirm delete
              >
                Yes, Delete
              </button>
              <button
                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition duration-200"
                onClick={() => setShowDeleteConfirm(false)} // Cancel delete
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
