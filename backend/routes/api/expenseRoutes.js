const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const {
  createExpense,
  getExpenseById,
  getRecentExpenses,
  updateExpense,
  deleteExpense,
  getExpenseByUser,
} = require("../../controllers/expenseController");

// Create a new transaction
router.post("/create", auth, createExpense);

// Get a transaction by ID
router.get("/get/:id", auth, getExpenseById);

// Get all transactions for a specific user
router.get("/user/get", auth, getExpenseByUser);

router.get("/user/get/recent", auth, getRecentExpenses);

// Update a transaction by ID
router.put("/update/:id", auth, updateExpense);

// Delete a transaction by ID
router.delete("/delete/:id", auth, deleteExpense);

module.exports = router;
