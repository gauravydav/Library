// models/userModel.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  checkedOutBooks: [
    {
      bookId: { type: String, ref: 'Book' }, 
      checkoutDate: { type: Date, default: Date.now },
    },
  ],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
