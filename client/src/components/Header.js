// client/src/components/Header.js
import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Button, Box, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Retrieve user ID from localStorage
    const storedUserId = localStorage.getItem("userId");
    setUserId(storedUserId);
  }, []); // Run once when the component mounts

  const handleLogout = () => {
    // Clear user ID and token from localStorage upon logout
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    setUserId(null);
    navigate("/");
  };

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          {userId && (
            <Typography variant="body1" sx={{ marginRight: 2, fontWeight: "bold" }}>
              User ID: {userId}
            </Typography>
          )}
        </Box>
        <Button
          component={Link}
          to="/dashboard/books"
          color="inherit"
          sx={{ marginRight: 2 }}
        >
          Books
        </Button>
        <Button
          component={Link}
          to="/dashboard/checkout-books"
          color="inherit"
          sx={{ marginRight: 2 }}
        >
          Checkout Books
        </Button>
        <Button component={Link} to="/dashboard/return-status" color="inherit">
          Return Status
        </Button>
        <Button color="inherit" onClick={handleLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
