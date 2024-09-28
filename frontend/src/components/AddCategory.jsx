/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";

const AddCategory = ({ onCategoryAdded }) => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiUrl = import.meta.env.VITE_BASE_URL;
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post(
        `${apiUrl}/api/category/create`,
        { name },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      onCategoryAdded(response.data.category); // Trigger a refresh in parent component
      setName(""); // Reset the form
    } catch (error) {
      setError(error.response?.data?.message || "Error adding category");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-4">
      <form onSubmit={handleSubmit}>
        <br />
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 p-2 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md text-black"
          placeholder="Category name"
        />
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        <button
          type="submit"
          className="mt-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-700 hover:bg-indigo-700"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Category"}
        </button>
      </form>
    </div>
  );
};

export default AddCategory;
