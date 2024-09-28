const Expense = require("../models/Expense");

// @desc    Create a new transaction
// @route   POST /api/transactions
// @access  Private
const createExpense = async (req, res) => {
  const user = req.user.id;
  console.log(user);
  const { amount, description, category, transactionDate } = req.body;

  try {
    const expense = new Expense({
      amount,
      description,
      transactionDate,
      user,
      category,
    });

    const createdExpense = await expense.save();
    res.status(201).json({
      message: "Expense created successfully",
      createdExpense,
    });
  } catch (error) {
    res.status(400).json({ message: "Error creating expense", error });
  }
};

// @desc    Get a transaction by ID
// @route   GET /api/transactions/:id
// @access  Private
const getExpenseById = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.json(expense);
  } catch (error) {
    res.status(500).json({ message: "Error fetching expense", error });
  }
};

// @desc    Get all transactions for a specific user
// @route   GET /api/transactions/user/:userId
// @access  Private
const getExpenseByUser = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user.id }).populate(
      "category"
    );

    if (expenses.length === 0) {
      return res
        .status(404)
        .json({ message: "No expenses found for this user" });
    }

    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching expenses", error });
  }
};

// Example Node.js/Express route to get recent transactions
const getRecentExpenses = async (req, res) => {
  try {
    const recentExpenses = await Expense.find()
      .sort({ date: -1 })
      .limit(3)
      .populate("category");

    if (recentExpenses.length === 0) {
      return res
        .status(404)
        .json({ message: "No expenses found for this user" });
    }

    res.json(recentExpenses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching expenses", error });
  }
};

// @desc    Update a transaction by ID
// @route   PUT /api/transactions/:id
// @access  Private
const updateExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    const { amount, description, category, expenseDate } = req.body;

    expense.amount = amount || expense.amount;
    expense.description = description || expense.description;
    expense.category = category || expense.category;
    expense.expenseDate = expenseDate || expense.expenseDate;

    const updatedExpense = await expense.save();
    res.json(updatedExpense);
  } catch (error) {
    res.status(500).json({ message: "Error updating expense", error });
  }
};

// @desc    Delete a transaction by ID
// @route   DELETE /api/transactions/:id
// @access  Private
const deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    await expense.deleteOne({ _id: req.params.id });
    res.json({ message: "Expense deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting expense", error });
  }
};

module.exports = {
  createExpense,
  getExpenseById,
  getExpenseByUser,
  updateExpense,
  deleteExpense,
  getRecentExpenses,
};
