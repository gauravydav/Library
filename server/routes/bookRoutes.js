// routes/bookRoutes.js
const express = require('express');
const bookController = require('../controllers/bookController');

const router = express.Router();

// Retrieve all books
router.get('/api/books', bookController.getAllBooks);

// Add a new book
router.post('/api/books', bookController.addBook);

// Update a specific book
router.put('/api/books/:id', bookController.updateBook);

// Delete a specific book
router.delete('/api/books/:id', bookController.deleteBook);

module.exports = router;
