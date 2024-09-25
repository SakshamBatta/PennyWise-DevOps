const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../../controllers/userController");

// @route  POST routes/userRoutes/register
// @desc   Register a new user

router.post("/register", registerUser);

// @route  POST routes/userRoutes/login
// @desc   Login user

router.post("/login", loginUser);

module.exports = router;
