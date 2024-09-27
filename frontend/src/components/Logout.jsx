  import { useNavigate } from "react-router-dom";

  export default function Logout() {
    const navigate = useNavigate();
    const handleLogout = () => {
      localStorage.removeItem("authToken");
      navigate("/login");
    };

    return (
      <div>   
        <button
          className="bg-red-500 text-white px-4 py-2 rounded"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    );
  }
