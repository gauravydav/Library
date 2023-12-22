// controllers/checkoutController.js
const User = require('../models/user');
const Book = require('../models/bookModel');

async function checkoutBook(req, res) {
  const { userId, bookId } = req.body;

  try {
    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find the book by ID
    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    // Check if the book is available for checkout
    if (book.copies <= 0) {
      return res.status(400).json({ message: 'Book not available for checkout' });
    }

    // Update the user's checkedOutBooks array
    user.checkedOutBooks.push({ bookId, checkoutDate: new Date() });

    // Reduce the number of available copies of the book
    book.copies--;

    // Save the updated user and book
    await user.save();
    await book.save();

    res.status(200).json({ message: 'Book checked out successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

module.exports = {
  checkoutBook,
};
// controllers/checkoutController.js


async function returnBook(req, res) {
  const { id } = req.params; // ID of the checkout entry

  try {
    // Find the user by the checkout entry ID
    const user = await User.findOne({ 'checkedOutBooks._id': id });

    if (!user) {
      return res.status(404).json({ message: 'Checkout entry not found' });
    }

    // Find the checkout entry in the user's checkedOutBooks array
    const checkoutEntry = user.checkedOutBooks.find((entry) => entry._id.toString() === id);

    if (!checkoutEntry) {
      return res.status(404).json({ message: 'Checkout entry not found' });
    }

    // Find the corresponding book by ID
    const book = await Book.findById(checkoutEntry.bookId);

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    // Increase the number of available copies of the book
    book.copies++;

    // Remove the checkout entry from the user's checkedOutBooks array
    user.checkedOutBooks.pull(id);

    // Save the updated user and book
    await user.save();
    await book.save();

    res.status(200).json({ message: 'Book returned successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

module.exports = {
  returnBook,
};


async function checkoutBook(req, res) {
  const { userId, bookId } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    if (book.copies <= 0) {
      return res.status(400).json({ message: 'Book not available for checkout' });
    }

    user.checkedOutBooks.push({ bookId, checkoutDate: new Date() });
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
    const user = await User.findOne({ 'checkedOutBooks._id': id });

    if (!user) {
      return res.status(404).json({ message: 'Checkout entry not found' });
    }

    const checkoutEntry = user.checkedOutBooks.find((entry) => entry._id.toString() === id);

    if (!checkoutEntry) {
      return res.status(404).json({ message: 'Checkout entry not found' });
    }

    const book = await Book.findById(checkoutEntry.bookId);

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    book.copies++;
    user.checkedOutBooks.pull(id);

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
