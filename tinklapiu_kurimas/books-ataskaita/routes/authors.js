const express = require('express');
const authorsController = require('../controllers/authorsController');
const router = express.Router();

// get all authors
router.get('/', authorsController.getAllAuthors);

// get author by id
router.get('/:id', authorsController.getAuthorById);

// create author (only for admin)
router.post('/', authorsController.createAuthor);

// update author by id (only for admin)
router.patch('/:id', authorsController.updateAuthor);

// delete author by id (only for admin)
router.delete('/:id', authorsController.deleteAuthor);

module.exports = router;
