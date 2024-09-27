/* eslint-disable react/prop-types */
import { useState } from "react";

const EditCategory = ({ category, onClose, onSave }) => {
  const [name, setName] = useState(category.name);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedCategory = { ...category, name };
    onSave(updatedCategory); // Call onSave to update category
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Edit Category</h2>
        <form onSubmit={handleSubmit}>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Category Name:
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
          <div className="flex justify-between mt-4">
            <button
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition duration-200"
            >
              Save
            </button>
            <button
              type="button"
              className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition duration-200"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCategory;
