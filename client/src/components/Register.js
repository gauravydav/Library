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
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await axios.post("http://localhost:5000/api/register", {
        name,
        email,
        password,
      });

      // Redirect to the login page or perform any other actions upon successful registration
      // For example, you can use React Router to navigate to the login page
      navigate("/dashboard");
    } catch (error) {
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
