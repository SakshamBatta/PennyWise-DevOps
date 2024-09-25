import { useState } from "react";
import { registerUser } from "../api/authService";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");
    try {
      const response = await registerUser(formData);
      console.log("User registered Successfully", response);
      setSuccess("Signup Successful");
      navigate("/dashboard");
    } catch (error) {
      setError(error.message || "Something went wrong");
      console.error("Error during registration", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 bg-opacity-80 rounded-lg shadow-xl">
        <h2 className="text-center text-3xl font-extrabold text-white">
          Sign Up
        </h2>
        {}
        {success && <div className="text-green-500 text-center">{success}</div>}
        {error && <div className="text-red-500 text-center">{error}</div>}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="w-full px-4 py-3 rounded-md border border-gray-600 bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:border-white"
                placeholder="Name"
                onChange={handleChange}
              />
            </div>
            <div>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full px-4 py-3 rounded-md border border-gray-600 bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:border-white"
                placeholder="Email address"
                onChange={handleChange}
              />
            </div>
            <div>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="w-full px-4 py-3 rounded-md border border-gray-600 bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:border-white"
                placeholder="Password"
                onChange={handleChange}
              />
            </div>
          </div>

          <button
            type="submit"
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md bg-gradient-to-r from-white to-gray-300 text-black hover:from-gray-100 hover:to-gray-400 shadow-lg transition-all ease-in-out duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
