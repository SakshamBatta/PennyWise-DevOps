const mongoose = require("mongoose");

// Define the Transaction Schema
const expenseSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId, // Reference to the user
      ref: "User",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      maxlength: 500, // Optional description with a maximum length
    },
    expenseDate: {
      type: Date,
      default: Date.now, // Defaults to the current date
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` timestamps
  }
);

// Create the Transaction Model
const Expense = mongoose.model("Expense", expenseSchema);

module.exports = Expense;
