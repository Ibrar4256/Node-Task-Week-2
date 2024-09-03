const { validationResult } = require("express-validator");

exports.productValidation = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errors.array().map((err) => ({
      message: err.msg,
      field: err.param,
      location: err.location,
    }));
    
    next();
  }
};
