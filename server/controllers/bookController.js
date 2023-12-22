
const Book = require('../ models/bookModel');

async function getAllBooks(req, res) {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

async function addBook(req, res) {
  const { id, title, author, isbn, published_at, copies } = req.body;

  try {
    const newBook = new Book({ id, title, author, isbn, published_at, copies });
    await newBook.save();

    res.status(201).json({ message: 'Book added successfully', book: newBook });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

//const { ObjectID } = require('mongodb');  // Import ObjectID from MongoDB

const { ObjectID } = require('mongodb');


const { ObjectId } = require('mongodb');

async function updateBook(req, res) {
  const { id } = req.params;
  const { title, author, isbn, published_at, copies } = req.body;

  try {
    // Convert id to ObjectId type
    const objectId = new ObjectId(id);

    const updatedBook = await Book.findOneAndUpdate(
      { _id: objectId }, // Use _id instead of id, assuming _id is the default MongoDB ObjectId
      { title, author, isbn, published_at, copies },
      { new: true }
    );

    console.log('hlw', updatedBook);

    if (!updatedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.status(200).json({ message: 'Book updated successfully', book: updatedBook });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}


  



async function deleteBook(req, res) {
  const { id } = req.params;

  try {
    // Convert id to ObjectId type
    const objectId = new ObjectId(id);

    const deletedBook = await Book.findOneAndDelete({ _id: objectId });

    if (!deletedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.status(200).json({ message: 'Book deleted successfully', book: deletedBook });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}


module.exports = {
  getAllBooks,
  addBook,
  updateBook,
  deleteBook,
};
