const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const userRoutes = require("./routes/api/userRoutes");
const dbConnect = require("./config/db");

const app = express();

app.use(cors());

dbConnect();

app.use(express.json());

app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server Started at Port No ${PORT}`);
});
