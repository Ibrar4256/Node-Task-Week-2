const path = require("path");
const express = require("express");
const tokenVerification = require("../Middleware/authMiddleware");
const categoryController = require("../controllers/categoryController");
const { productValidation } = require("../Middleware/validationmiddlware");
const { validateCategory } = require("../Validations/validation");

const router = express.Router();

router.post(
  "/addCategory",
  tokenVerification,
  validateCategory,
  productValidation,
  categoryController.addCategory
);

module.exports = router;
