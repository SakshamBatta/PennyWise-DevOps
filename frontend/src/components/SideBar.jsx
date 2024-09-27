// Sidebar.js
import { Link } from "react-router-dom";
import { FaHome, FaChartBar, FaList, FaSignOutAlt } from "react-icons/fa";

export default function Sidebar() {
  return (
    <div className="bg-gray-900 text-white w-48 min-h-screen p-5 shadow-md">
      <h2 className="text-2xl font-bold mb-5">Dashboard</h2>
      <ul>
        <li className="mb-3 hover:bg-gray-800 rounded">
          <Link to="/" className="flex items-center p-2 hover:text-gray-300">
            <FaHome className="mr-2" /> Home
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
        {/* Add more links as necessary */}
      </ul>
    </div>
  );
}
