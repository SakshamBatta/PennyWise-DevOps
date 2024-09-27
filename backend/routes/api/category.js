const {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} = require("../../controllers/categoryController");
const auth = require("../../middleware/auth");

const router = require("express").Router();

router.post("/create", auth, createCategory);
router.get("/get", auth, getCategories);
router.put("/update/:id", auth, updateCategory);
router.delete("/delete/:id", auth, deleteCategory);

module.exports = router;
