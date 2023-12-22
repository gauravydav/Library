// controllers/checkoutController.js
const User = require('../models/user');
const Book = require('../models/bookModel');

async function checkoutBook(req, res) {
  const { userId, bookId } = req.body;

  try {
    const user = await User.findOne({ 'id': userId }); // Change '_id' to 'id'

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const book = await Book.findOne({ 'id': bookId }); // Change '_id' to 'id'

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    if (book.copies <= 0) {
      return res.status(400).json({ message: 'Book not available for checkout' });
    }

    user.checkedOutBooks.push({ id: bookId, checkoutDate: new Date() });
    book.copies--;

    await user.save();
    await book.save();

    res.status(200).json({ message: 'Book checked out successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

async function returnBook(req, res) {
  const { id } = req.params;

  try {
    const user = await User.findOne({ 'checkedOutBooks.id': id }); // Change '_id' to 'id'

    if (!user) {
      return res.status(404).json({ message: 'Checkout entry not found' });
    }

    const checkoutEntry = user.checkedOutBooks.find((entry) => entry.id.toString() === id); // Change '_id' to 'id'

    if (!checkoutEntry) {
      return res.status(404).json({ message: 'Checkout entry not found' });
    }

    const book = await Book.findOne({ 'id': checkoutEntry.id }); // Change 'bookId' to 'id'

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    book.copies++;
    user.checkedOutBooks.pull(checkoutEntry); // Use the entire checkout entry instead of just the id

    await user.save();
    await book.save();

    res.status(200).json({ message: 'Book returned successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

module.exports = {
  checkoutBook,
  returnBook,
};
