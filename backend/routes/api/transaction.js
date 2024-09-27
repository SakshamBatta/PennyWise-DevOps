const express = require("express");
const router = express.Router();
const {
  createTransaction,
  getTransactionById,
  getTransactionsByUser,
  updateTransaction,
  deleteTransaction,
  getRecentTransactions,
} = require("../../controllers/transactionController");
const auth = require("../../middleware/auth");

// Create a new transaction
router.post("/create", auth, createTransaction);

// Get a transaction by ID
router.get("/get/:id", auth, getTransactionById);

// Get all transactions for a specific user
router.get("/user/get", auth, getTransactionsByUser);

router.get("/user/get/recent", auth, getRecentTransactions);

// Update a transaction by ID
router.put("/update/:id", auth, updateTransaction);

// Delete a transaction by ID
router.delete("/delete/:id", auth, deleteTransaction);

module.exports = router;
