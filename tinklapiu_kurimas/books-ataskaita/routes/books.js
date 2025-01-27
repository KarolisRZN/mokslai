const express = require('express');
const router = express.Router();
const { getAllBooks, getBookById, createBook, updateBook, deleteBook, patchBook } = require('../controllers/booksController');
const { verifyAdmin } = require('../middleware/authMiddleware');

// get all books
router.get('/', getAllBooks);

// get book by id
router.get('/:id', getBookById);

// create book
router.post('/', verifyAdmin, createBook);

// update book by id
router.put('/:id', verifyAdmin, updateBook);

// update book by id
router.patch('/:id', verifyAdmin, patchBook);

// delete book by id
router.delete('/:id', verifyAdmin, deleteBook);

module.exports = router;