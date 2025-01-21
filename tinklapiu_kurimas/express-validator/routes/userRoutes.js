const express = require('express');
const { getAllUsers, getUserById, addUser, deleteUser, registerUser } = require('../controllers/userController');

const router = express.Router();

// Define the API endpoints for users
router.get('/users', getAllUsers);
router.get('/users/:id', getUserById);
router.post('/users', addUser);
router.delete('/users/:id', deleteUser);
router.post('/register', registerUser);

module.exports = router;
