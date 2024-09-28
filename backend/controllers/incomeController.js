const express = require("express");
const Income = require("../models/Income");

const addIncome = async (req, res) => {
  const { amount, source, date } = req.body;
  const user = req.user.id;
  try {
    const income = await new Income({ user, amount, source, date });

    await income.save();

    res.status(200).json(income);
  } catch (error) {
    res.status(400).json({ message: "Error creating income", error });
  }
};

const getIncome = async (req, res) => {
  const user = req.user.id;
  try {
    const income = await Income.find({ user });

    if (!income || income.length == 0) {
      return res.status(400).json({
        message: "No income found for particular user",
      });
    }

    res.status(200).json(income);
  } catch (error) {
    res.status(400).json({ message: "Error creating income", error });
  }
};

const updateIncome = async (req, res) => {
  const incomeId = req.params.id;
  const { amount, date, source } = req.body;
  try {
    const income = await Income.findById(incomeId);

    if (!income) {
      return res.status(400).json({ message: "No income found " });
    }

    income.amount = amount || income.amount;
    income.date = date || income.date;
    income.source = source || income.source;

    const newIncome = await income.save();

    res.status(200).json({ message: "Income updated successfully" });
  } catch (error) {
    res.status(400).json({ message: "Error updating income", error });
  }
};

const deleteIncome = async (req, res) => {
  const incomeId = req.params.id;

  try {
    const income = await Income.findById(incomeId);

    if (!income) {
      return res.status(400).json({ message: "No income found " });
    }

    await income.deleteOne({ incomeId });

    res.status(200).json({ message: "Income deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Error deleting income", error });
  }
};

module.exports = { addIncome, getIncome, updateIncome, deleteIncome };
