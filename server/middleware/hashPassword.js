// const bcrypt = require('bcrypt');
// require('dotenv').config();

// const hashPasswordMiddleware = async function (next) {
//   if (!this.isModified('password')) {
//     return next();
//   }

//   try {
//     const hashedPassword = await bcrypt.hash(this.password, 10);
//     this.password = hashedPassword;
//     next();
//   } catch (error) {
//     return next(error);
//   }
// };

// module.exports = hashPasswordMiddleware;
