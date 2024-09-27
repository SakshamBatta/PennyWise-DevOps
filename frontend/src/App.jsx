import Dashboard from "./components/Dashboard";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import Category from "./components/Category";
import UserProfile from "./components/UserProfile";
import TransactionsPage from "./components/TransactionsPage";
import AddTransaction from "./components/AddTransaction";
import EditTransaction from "./components/EditTransaction";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/categories" element={<Category />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/transactions" element={<TransactionsPage />} />
        <Route path="/add-transaction" element={<AddTransaction />} />
        <Route path="/edit-transaction/:id" element={<EditTransaction />} />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
