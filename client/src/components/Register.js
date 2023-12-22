// client/src/components/Register.js
import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  TextField,
  FormControl,
  InputLabel,
  Input,
  Snackbar,
  Container,
  Paper,
  Typography,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

const Register = () => {
  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      // Log the input values for debugging
      console.log("User ID:", userId);
      console.log("Name:", name);
      console.log("Email:", email);
      console.log("Password:", password);

      // Make the registration request
      await axios.post("http://localhost:5000/auth/register", {
        id: userId, // Assuming your server expects 'id' instead of 'USERID'
        name,
        email,
        password,
      });

      // Redirect to the dashboard or perform any other actions upon successful registration
      navigate("/");
    } catch (error) {
      console.error("Registration failed. Error:", error);
      setSnackbarMessage("Registration failed. Please try again.");
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} style={{ padding: 20, marginTop: 50 }}>
        <Typography variant="h5" align="center">
          MERN LIBRARY
        </Typography>
        <form>
          <FormControl fullWidth margin="normal">
            <InputLabel>User ID</InputLabel>
            <Input
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Name</InputLabel>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Email</InputLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Password</InputLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleRegister}
          >
            Register
          </Button>
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={6000}
            onClose={handleSnackbarClose}
            message={snackbarMessage}
          />
        </form>
      </Paper>
    </Container>
  );
};

export default Register;
