const {
  addIncome,
  getIncome,
  updateIncome,
  deleteIncome,
} = require("../../controllers/incomeController");

const router = require("express").Router();

const auth = require("../../middleware/auth");

router.post("/create", auth, addIncome);
router.get("/get/all", auth, getIncome);
router.put("/update/:id", auth, updateIncome);
router.delete("/delete/:id", auth, deleteIncome);

module.exports = router;
