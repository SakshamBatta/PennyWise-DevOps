const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const userRoutes = require("./routes/api/userRoutes");
const categoryRoutes = require("./routes//api/category");
const transactionRoutes = require("./routes//api/transaction");
const dbConnect = require("./config/db");

const app = express();

app.use(cors());

dbConnect();

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/transaction", transactionRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server Started at Port No ${PORT}`);
});
