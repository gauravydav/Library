// models/bookModel.js
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  author: { type: String, required: true },
  isbn: { type: String, required: true, unique: true },
  published_at: { type: Date, required: true },
  copies: { type: Number, required: true },
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
