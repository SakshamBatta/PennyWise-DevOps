import { useState } from "react";
import { registerUser } from "../api/authService";
import { useNavigate } from "react-router-dom";
import "./Signup.css"; // Import CSS file for custom styles

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
    <div className="min-h-screen bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center p-4">
      <div className="w-full max-w-md p-10 space-y-6 bg-white shadow-lg rounded-lg signup-card">
        <h2 className="text-center text-3xl font-extrabold text-gray-700 animate-fade-in">
          Sign Up
        </h2>
        {success && <div className="text-green-500 text-center">{success}</div>}
        {error && <div className="text-red-500 text-center">{error}</div>}
        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <input
              id="name"
              name="name"
              type="text"
              required
              className="input-field"
              placeholder="Name"
              onChange={handleChange}
            />
            <input
              id="email"
              name="email"
              type="email"
              required
              className="input-field"
              placeholder="Email address"
              onChange={handleChange}
            />
            <input
              id="password"
              name="password"
              type="password"
              required
              className="input-field"
              placeholder="Password"
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="submit-button">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
