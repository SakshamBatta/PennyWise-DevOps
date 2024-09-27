const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  deleteUserAccount,
} = require("../../controllers/userController");
const auth = require("../../middleware/auth");

// @route  POST routes/userRoutes/register
// @desc   Register a new user

router.post("/register", registerUser);

// @route  POST routes/userRoutes/login
// @desc   Login user

router.post("/login", loginUser);

// Route to get user profile
router.get("/profile", auth, getUserProfile);

// Route to update user profile
router.put("/profile", auth, updateUserProfile);

// Route to delete user account
router.delete("/account", auth, deleteUserAccount);

module.exports = router;
