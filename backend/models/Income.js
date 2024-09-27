// models/Income.js
const mongoose = require("mongoose");

const incomeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Income", incomeSchema);
