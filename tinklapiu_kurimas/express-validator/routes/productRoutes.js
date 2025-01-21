const express = require('express');
const { getProducts } = require('../controllers/productController');

const router = express.Router();

// Define the API endpoints for products
router.get('/products', getProducts);

module.exports = router;
