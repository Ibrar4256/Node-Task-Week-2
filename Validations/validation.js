const { check, param, validationResult } = require("express-validator");

// Validate Product
const validateProduct = [
  check("name")
    .isString()
    .withMessage("Name must be a string")
    .notEmpty()
    .withMessage("Product name is required"),
  check("description")
    .notEmpty()
    .withMessage("Product description is required"),
  check("price").isNumeric().withMessage("Price must be a number"),
  check("category")
    .isMongoId()
    .withMessage("Category must be a valid MongoDB ID"),
  check("user").isMongoId().withMessage("User must be a valid MongoDB ID"),
];

const validateSignUp = [
  check("name").notEmpty().withMessage("User name is required"),
  check("email").isEmail().withMessage("Valid email is required"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const filteredErrors = errors.array().map((err) => ({
        message: err.msg,
        field: err.param,
        location: err.location,
      }));
      return res.status(400).json({ errors: filteredErrors });
    }
    next();
  },
];

const validateUser = [
  check("email").isEmail().withMessage("Valid email is required"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const filteredErrors = errors.array().map((err) => ({
        message: err.msg,
        field: err.param,
        location: err.location,
      }));
      return res.status(400).json({ errors: filteredErrors });
    }
    next();
  },
];

const validateCategory = [
  check("name").notEmpty().withMessage("Category name is required"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const filteredErrors = errors.array().map((err) => ({
        message: err.msg,
        field: err.param,
        location: err.location,
      }));
      return res.status(400).json({ errors: filteredErrors });
    }
    next();
  },
];

module.exports = {
  validateProduct,
  validateSignUp,
  validateUser,
  validateCategory,
};
