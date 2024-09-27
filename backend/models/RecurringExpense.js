// models/RecurringExpense.js
const mongoose = require("mongoose");

const recurringExpenseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  amount: { type: Number, required: true },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  recurrence: {
    type: String,
    enum: ["Daily", "Weekly", "Monthly", "Yearly"],
    required: true,
  },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("RecurringExpense", recurringExpenseSchema);
