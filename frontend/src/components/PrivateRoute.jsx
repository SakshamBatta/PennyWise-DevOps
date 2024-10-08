import { Navigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export default function PrivateRoute({ children }) {
  const token = localStorage.getItem("authToken");
  console.log("Token in PrivateRoute:", token);

  return token ? children : <Navigate to="/login" />;
}
