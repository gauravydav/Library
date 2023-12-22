// client/src/components/Header.js
import React from "react";
import { AppBar, Toolbar, Button, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/");
  };

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          {/* This will push the buttons to the right */}
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