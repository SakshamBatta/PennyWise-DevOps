const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = async (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  console.log("Token is ", token);

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    console.log(req.user);
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token is not valid" });
  }
};

module.exports = auth;
