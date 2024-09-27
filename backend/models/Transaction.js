const mongoose = require("mongoose");

// Define the Transaction Schema
const transactionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId, // Reference to the user
      ref: "User",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0, // Ensure the amount is positive
    },
    transactionType: {
      type: String,
      enum: ["credit", "debit"], // Ensure it's either 'credit' or 'debit'
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ["card", "bank_transfer", "upi", "cash"], // You can add more payment methods as needed
      required: true,
    },
    description: {
      type: String,
      maxlength: 500, // Optional description with a maximum length
    },
    transactionDate: {
      type: Date,
      default: Date.now, // Defaults to the current date
    },
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` timestamps
  }
);

// Create the Transaction Model
const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
