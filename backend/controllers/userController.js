const express = require("express");
const {
  registerSchema,
  loginSchema,
} = require("../validations/userValidation");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const registerUser = async (req, res) => {
  try {
    const validatedData = registerSchema.parse(req.body);
    const { name, email, password } = validatedData;

    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const loginUser = async (req, res) => {
  const validatedData = loginSchema.parse(req.body);
  const { email, password } = validatedData;

  let user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({
      message: "No user found",
    });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json({
      message: "Invalid Credentials",
    });
  }

  const token = jwt.sign({ user: { id: user._id } }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.json({
    token,
  });
};

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const updateUserProfile = async (req, res) => {
  const {
    name,
    email,
    password,
    profilePicture,
    notificationPreferences,
    address,
    phone,
    dob,
  } = req.body;

  // Validate input
  if (!name || !email) {
    return res.status(400).json({ message: "Name and email are required" });
  }

  try {
    const user = await User.findById(req.user.id);

    // Update fields
    user.name = name;
    user.email = email;
    user.profilePicture = profilePicture || user.profilePicture;
    user.notificationPreferences =
      notificationPreferences || user.notificationPreferences;
    user.address = address || user.address;
    user.phone = phone || user.phone;
    user.dob = dob || user.dob;

    // Hash password if provided
    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    await user.save();
    res.json({ message: "Profile updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const deleteUserAccount = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user.id);
    res.json({ message: "Account deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  deleteUserAccount,
};
