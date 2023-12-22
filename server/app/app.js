const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("../routes/authRoutes");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Connect to MongoDB

const dbURI =
  "mongodb+srv://gauravyadava963998:LzVqwT0nQQ37CMOt@cluster0.yj6gutd.mongodb.net/MachineTest?retryWrites=true&w=majority";

try {
  mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });

  const dbConnection = mongoose.connection;

  // Event listener for successful connection
  dbConnection.on("connected", () => {
    console.log("MongoDB connected successfully");
  });

  // Event listener for connection error
  dbConnection.on("error", (err) => {
    console.error("MongoDB connection error:", err);
  });

  // Event listener for disconnection
  dbConnection.on("disconnected", () => {
    console.log("MongoDB disconnected");
  });

  // Close the Mongoose connection when the Node process terminates
  process.on("SIGINT", () => {
    dbConnection.close(() => {
      console.log("MongoDB connection closed through app termination");
      process.exit(0);
    });
  });
} catch (error) {
  console.error("Error connecting to MongoDB:", error.message);
}

// Routes
app.use("/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
