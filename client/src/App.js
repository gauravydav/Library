// client/src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import { Container, Paper, Typography, Button } from "@mui/material";
import Dashboard from "./components/Dashboard";
import CheckoutBooks from "./components/CheckoutBooks";
import ReturnStatus from "./components/ReturnStatus";
import Books from "./components/Book";

import Header from "./components/Header";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <React.Fragment>
              <Login />
              <Typography variant="body2" align="center">
                Don't have an account?{" "}
                <Button component={Link} to="/register" color="primary">
                  Sign Up
                </Button>
              </Typography>
            </React.Fragment>
          }
        />
        <Route
          path="/register"
          element={
            <React.Fragment>
              <Register />
              <Typography variant="body2" align="center">
                Already have an account?{" "}
                <Button component={Link} to="/" color="primary">
                  Log In
                </Button>
              </Typography>
            </React.Fragment>
          }
        />
        <Route path="/dashboard" element={<Books />} />
        <Route path="/dashboard/books" element={<Books />} />
        <Route path="/dashboard/checkout-books" element={<CheckoutBooks />} />
        <Route path="/dashboard/return-status" element={<ReturnStatus />} />
      </Routes>
    </Router>
  );
}

export default App;
