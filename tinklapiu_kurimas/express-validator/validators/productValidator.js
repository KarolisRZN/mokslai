const { query } = require("express-validator");

exports.validateProductQuery = [
  query("price")
    .optional()
    .isFloat({ min: 0, max: 999999.99 })
    .withMessage(
      "Price must be a positive number with up to 2 decimal places."
    ),
  query("category")
    .notEmpty()
    .withMessage("Category is required and must be a non-empty string."),
];
