const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { productValidation } = require("../Middleware/validationmiddlware");
const { validateSignUp, validateUser } = require("../Validations/validation");
const tokenVerification = require("../Middleware/authMiddleware");

router.post(
  "/register",
  validateSignUp,
  productValidation,
  userController.register
);
router.post("/login", validateUser, productValidation, userController.login);
router.get("/allusers", tokenVerification, userController.fetchAllUsers);
router.get("/userProducts", tokenVerification, userController.getUserProducts);

module.exports = router;
