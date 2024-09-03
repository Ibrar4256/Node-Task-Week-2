const path = require("path");
const express = require("express");
const tokenVerification = require("../Middleware/authMiddleware");
const { productValidation } = require("../Middleware/validationmiddlware");
const {
  validateProduct,
} = require("../Validations/validation");
const productController = require("../controllers/productController");

const router = express.Router();

router.post(
  "/addProduct",
  tokenVerification,
  validateProduct,
  productValidation,
  productController.addProduct
);
router.put(
  "/updateProduct/:id",
  tokenVerification,
  validateProduct,
  productValidation,
  productController.updateProduct
);
router.delete(
  "/deleteProduct/:id",
  tokenVerification,
  productController.deleteProduct
);
router.get(
  "/:id",
  tokenVerification,
  productController.fetchProductById
);
router.get(
  "/user/:userId",
  tokenVerification,
  productController.getProductsByUser
);
router.get(
  "/category/:categoryId",
  tokenVerification,
  productController.getProductsByCategory
);
router.get("/", tokenVerification, productController.fetchAllProducts);

module.exports = router;
