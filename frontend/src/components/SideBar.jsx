import { Link, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaChartBar,
  FaList,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear authentication token or perform logout logic here
    localStorage.removeItem("authToken");
    navigate("/login"); // Redirect to login page after logout
  };

  return (
    <div className="bg-gray-900 text-white w-48 min-h-screen p-5 shadow-md">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-2xl font-bold">Dashboard</h2>
      </div>
      <ul>
        <li className="mb-3 hover:bg-gray-800 rounded">
          <Link
            to="/dashboard"
            className="flex items-center p-2 hover:text-gray-300"
          >
            <FaHome className="mr-2" /> Dashboard
          </Link>
        </li>
        <li className="mb-3 hover:bg-gray-800 rounded">
          <Link
            to="/categories"
            className="flex items-center p-2 hover:text-gray-300"
          >
            <FaList className="mr-2" /> Categories
          </Link>
        </li>
        <li className="mb-3 hover:bg-gray-800 rounded">
          <Link
            to="/transactions"
            className="flex items-center p-2 hover:text-gray-300"
          >
            <FaChartBar className="mr-2" /> Transactions
          </Link>
        </li>
        <li className="mb-3 hover:bg-gray-800 rounded">
          <Link
            to="/reports"
            className="flex items-center p-2 hover:text-gray-300"
          >
            <FaSignOutAlt className="mr-2" /> Reports
          </Link>
        </li>
        <li className="mb-3 hover:bg-gray-800 rounded">
          <Link
            to="/profile"
            className="flex items-center p-2 hover:text-gray-300"
          >
            <FaUser className="mr-2" /> Profile
          </Link>
        </li>
        {/* Logout option */}
        <li className="mb-3 hover:bg-gray-800 rounded">
          <button
            onClick={handleLogout}
            className="flex items-center p-2 w-full text-left hover:text-gray-300"
          >
            <FaSignOutAlt className="mr-2" /> Logout
          </button>
        </li>
      </ul>
    </div>
  );
}
