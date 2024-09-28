import { Link, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaChartBar,
  FaList,
  FaSignOutAlt,
  FaUser,
  FaDollarSign,
} from "react-icons/fa";

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <div className="bg-gray-700 text-white w-48 min-h-screen p-5 shadow-md font-bold">
      <div className="flex justify-between items-center mb-5">
        <Link className="text-2xl font-bold" to="/dashboard">
          Dashboard
        </Link>
      </div>
      <ul>
        <li className="mb-3 hover:bg-gray-800 rounded transition duration-200">
          <Link to="/" className="flex items-center p-2 hover:text-gray-300">
            <FaHome className="mr-2" /> Home
          </Link>
        </li>
        <li className="mb-3 hover:bg-gray-800 rounded transition duration-200">
          <Link
            to="/income"
            className="flex items-center p-2 hover:text-gray-300"
          >
            <FaDollarSign className="mr-2" /> Income
          </Link>
        </li>
        <li className="mb-3 hover:bg-gray-800 rounded transition duration-200">
          <Link
            to="/categories"
            className="flex items-center p-2 hover:text-gray-300"
          >
            <FaList className="mr-2" /> Categories
          </Link>
        </li>
        <li className="mb-3 hover:bg-gray-800 rounded transition duration-200">
          <Link
            to="/expense"
            className="flex items-center p-2 hover:text-gray-300"
          >
            <FaChartBar className="mr-2" /> Expenses
          </Link>
        </li>

        <li className="mb-3 hover:bg-gray-800 rounded transition duration-200">
          <Link
            to="/profile"
            className="flex items-center p-2 hover:text-gray-300"
          >
            <FaUser className="mr-2" /> Profile
          </Link>
        </li>
        <li className="mb-3 hover:bg-gray-800 rounded transition duration-200">
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
