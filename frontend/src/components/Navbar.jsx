// import { useNavigate } from "react-router-dom";
import Logout from "./Logout";

const NavBar = () => {
  // Function to navigate to profile

  return (
    <nav className="bg-gray-900 shadow-md rounded-lg mb-10">
      <div className="container mx-auto flex justify-between items-center p-4">
        <h1 className="text-2xl font-bold text-gray-100">Dashboard</h1>
        <div className="flex space-x-6">
          <Logout />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
