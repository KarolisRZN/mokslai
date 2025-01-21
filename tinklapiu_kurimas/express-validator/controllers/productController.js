const pool = require('../db');

// Get products with optional filters
const getProducts = async (req, res) => {
  const { price, category } = req.query;
  let query = 'SELECT * FROM products WHERE 1=1';
  const values = [];

  if (price) {
    query += ' AND price <= $1';
    values.push(price);
  }

  if (category) {
    query += ' AND category = $2';
    values.push(category);
  }

  try {
    const result = await pool.query(query, values);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Database error occurred' });
  }
};

module.exports = { getProducts };
