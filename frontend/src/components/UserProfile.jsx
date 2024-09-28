import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "./Sidebar"; // Import the Sidebar component

const UserProfile = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    dob: "",
    phone: "",
    address: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          navigate("/login");
          return;
        }
        const response = await axios.get(
          "http://localhost:3000/api/users/profile",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const formattedDob = new Date(response.data.dob)
          .toISOString()
          .split("T")[0];

        setUser({
          ...response.data,
          dob: formattedDob,
        });
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || "Error fetching user profile");
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        navigate("/login");
        return;
      }
      await axios.put("http://localhost:3000/api/users/profile", user, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Profile updated successfully!");
    } catch (err) {
      setError(err.response?.data?.message || "Error updating profile");
      toast.error("Error updating profile");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-white">
        <p className="text-gray-700 text-lg">Loading profile...</p>
      </div>
    );
  }
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar /> {/* Include the Sidebar here */}
      <div className="flex-grow flex items-center justify-center p-5 bg-gray-300">
        <ToastContainer />
        <div className="w-full max-w-4xl p-8 bg-white rounded-lg shadow-lg ">
          <h1 className="text-4xl font-bold text-gray-800 text-center mb-8">
            User Profile
          </h1>
          <div className="flex justify-center mb-6">
            <img
              src={user.profilePicture || "https://via.placeholder.com/150"}
              alt="Profile"
              className="rounded-full w-32 h-32 border-4 border-blue-400 object-cover shadow-xl"
            />
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-800 text-lg">Name</label>
                <input
                  type="text"
                  name="name"
                  value={user.name}
                  onChange={(e) => setUser({ ...user, name: e.target.value })}
                  className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-lg shadow-md focus:border-blue-400 focus:ring focus:ring-blue-300 text-gray-800 p-3 transition duration-200"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-800 text-lg">Email</label>
                <input
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-lg shadow-md focus:border-blue-400 focus:ring focus:ring-blue-300 text-gray-800 p-3 transition duration-200"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-800 text-lg">
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="dob"
                  value={user.dob}
                  onChange={(e) => setUser({ ...user, dob: e.target.value })}
                  className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-lg shadow-md focus:border-blue-400 focus:ring focus:ring-blue-300 text-gray-800 p-3 transition duration-200"
                />
              </div>
              <div>
                <label className="block text-gray-800 text-lg">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={user.phone}
                  onChange={(e) => setUser({ ...user, phone: e.target.value })}
                  className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-lg shadow-md focus:border-blue-400 focus:ring focus:ring-blue-300 text-gray-800 p-3 transition duration-200"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-gray-800 text-lg">Address</label>
                <input
                  type="text"
                  name="address"
                  value={user.address}
                  onChange={(e) =>
                    setUser({ ...user, address: e.target.value })
                  }
                  className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-lg shadow-md focus:border-blue-400 focus:ring focus:ring-blue-300 text-gray-800 p-3 transition duration-200"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition duration-200 shadow-lg"
            >
              Update Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
