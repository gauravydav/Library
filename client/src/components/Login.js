// client/src/components/Login.js
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
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [id, setId] = useState(""); // Add id state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:5000/auth/login", {
        id, // Include id in the login request if necessary
        email,
        password,
      });

      // Assuming the backend sends a token upon successful login
      const token = response.data.token;

      // Save the token to local storage or a secure storage method
      localStorage.setItem("token", token);

      // Redirect to a different page or perform any other actions upon successful login
      // For example, you can use React Router to navigate to another page
      navigate('/dashboard');

    } catch (error) {
      setSnackbarMessage("Invalid credentials. Please try again.");
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
            <InputLabel>ID</InputLabel>
            <Input
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
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
            onClick={handleLogin}
          >
            Login
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

export default Login;
