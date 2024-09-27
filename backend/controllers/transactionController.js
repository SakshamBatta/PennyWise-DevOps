const Transaction = require("../models/Transaction");

// @desc    Create a new transaction
// @route   POST /api/transactions
// @access  Private
const createTransaction = async (req, res) => {
  const user = req.user.id;
  console.log(user);
  const { amount, description, category, transactionDate } = req.body;

  try {
    const transaction = new Transaction({
      amount,
      description,
      transactionDate,
      user,
      category,
    });

    const createdTransaction = await transaction.save();
    res.status(201).json({
      message: "Transaction created successfully",
      createdTransaction,
    });
  } catch (error) {
    res.status(400).json({ message: "Error creating transaction", error });
  }
};

// @desc    Get a transaction by ID
// @route   GET /api/transactions/:id
// @access  Private
const getTransactionById = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.json(transaction);
  } catch (error) {
    res.status(500).json({ message: "Error fetching transaction", error });
  }
};

// @desc    Get all transactions for a specific user
// @route   GET /api/transactions/user/:userId
// @access  Private
const getTransactionsByUser = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user.id }).populate(
      "category"
    );

    if (transactions.length === 0) {
      return res
        .status(404)
        .json({ message: "No transactions found for this user" });
    }

    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: "Error fetching transactions", error });
  }
};

// Example Node.js/Express route to get recent transactions
const getRecentTransactions = async (req, res) => {
  try {
    const recentTransactions = await Transaction.find()
      .sort({ date: -1 })
      .limit(3)
      .populate("category");

    if (recentTransactions.length === 0) {
      return res
        .status(404)
        .json({ message: "No transactions found for this user" });
    }

    res.json(recentTransactions);
  } catch (error) {
    res.status(500).json({ message: "Error fetching transactions", error });
  }
};

// @desc    Update a transaction by ID
// @route   PUT /api/transactions/:id
// @access  Private
const updateTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    const { amount, description, category, transactionDate } = req.body;

    transaction.amount = amount || transaction.amount;
    transaction.description = description || transaction.description;
    transaction.category = category || transaction.category;
    transaction.transactionDate =
      transactionDate || transaction.transactionDate;

    const updatedTransaction = await transaction.save();
    res.json(updatedTransaction);
  } catch (error) {
    res.status(500).json({ message: "Error updating transaction", error });
  }
};

// @desc    Delete a transaction by ID
// @route   DELETE /api/transactions/:id
// @access  Private
const deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    await transaction.deleteOne({ _id: req.params.id });
    res.json({ message: "Transaction deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting transaction", error });
  }
};

module.exports = {
  createTransaction,
  getTransactionById,
  getTransactionsByUser,
  updateTransaction,
  deleteTransaction,
  getRecentTransactions,
};
