const express = require("express");
const Category = require("../models/Category");

const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const user = req.user.id;

    const categoryExists = await Category.findOne({ name, user });

    if (categoryExists) {
      return res.status(400).json({ message: "Category already exists" });
    }

    const category = new Category({ name, user });
    await category.save();

    res
      .status(201)
      .json({ message: "Category created successfully", category });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({ user: req.user.id });
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const categoryId = req.params.id;

    const category = await Category.findById(categoryId);

    if (!category) {
      return res.status(400).json({ message: "Category not found" });
    }

    category.name = name || category.name;

    await category.save();

    res
      .status(200)
      .json({ message: "Category Updated Successfully", category });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const user = req.user.id;

    const category = await Category.findById(categoryId);
    if (!category || category.user.toString() !== req.user.id) {
      return res
        .status(404)
        .json({ message: "Category not found or unauthorized" });
    }

    await category.deleteOne({ _id: categoryId, user });
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
};
