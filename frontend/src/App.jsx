import Dashboard from "./components/Dashboard";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import Category from "./components/Category";
import UserProfile from "./components/UserProfile";
import Expense from "./components/Expense";
import AddExpense from "./components/AddExpense";
// import EditTransaction from "./components/EditTransaction";
import Income from "./components/Income";
import AddIncome from "./components/AddIncome";
import EditExpense from "./components/EditExpense";
import LandingPage from "./components/LandingPage";
import ReportPage from "./components/ReportPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/categories" element={<Category />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/expense" element={<Expense />} />
        <Route path="/add-expense" element={<AddExpense />} />
        <Route path="/edit-expense/:id" element={<EditExpense />} />
        <Route path="/income" element={<Income />} />
        <Route path="/add-income" element={<AddIncome />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/reports" element={<ReportPage />} />

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
