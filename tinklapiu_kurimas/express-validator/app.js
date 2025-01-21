const express = require('express');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes'); // Add this line

dotenv.config();
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use('/api', userRoutes);
app.use('/api', productRoutes); // Add this line

// Default 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
