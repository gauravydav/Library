// routes/checkoutRoutes.js
const express = require('express');
const checkoutController = require('../controllers/checkoutController');

const router = express.Router();

// Checkout a book
router.post('/api/checkouts', checkoutController.checkoutBook);
router.put('/api/checkouts/:id', checkoutController.returnBook);
// Check if a book is checked out by a user
//router.get('/api/checkouts/:userId/:bookId', checkoutController.isBookCheckedOut);

module.exports = router;
