// models/SavingsGoal.js
const mongoose = require("mongoose");

const savingsGoalSchema = new mongoose.Schema({
  title: { type: String, required: true },
  amount: { type: Number, required: true },
  targetDate: { type: Date, required: true },
  currentSavedAmount: { type: Number, default: 0 },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("SavingsGoal", savingsGoalSchema);
