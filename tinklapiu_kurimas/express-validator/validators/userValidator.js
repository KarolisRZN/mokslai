const { body, param } = require('express-validator');

exports.validateUserRegistration = [
  body('email').isEmail().withMessage('Must be a valid email address.'),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long.'),
  body('age').optional().isInt({ min: 1 }).withMessage('Age must be a positive integer.'),
];

exports.validateUserId = [
  param('id').isInt().withMessage('User ID must be a numeric value.'),
];
