import { useState } from "react";
import { loginUser } from "../api/authService"; 
import { useNavigate } from "react-router-dom";
import "./Login.css"; // Import CSS file for custom styles

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await loginUser(formData); 
      localStorage.setItem("authToken", response.token); 
      navigate("/dashboard", { replace: true });
    } catch (error) {
      setError("Invalid credentials");
      console.error(error.message);
    } finally {
      setLoading(false);
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
      <div className="w-full max-w-md p-10 space-y-6 bg-white shadow-lg rounded-lg login-card">
        <h2 className="text-center text-3xl font-extrabold text-gray-700">
          Log In
        </h2>
        {error && <div className="text-red-500 text-center">{error}</div>}
        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-4">
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

          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? "Logging In..." : "Log In"}
          </button>
        </form>
      </div>
    </div>
  );
}
