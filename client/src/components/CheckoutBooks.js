import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Snackbar,
} from '@mui/material';
import Header from './Header'

const Checkout = () => {
  const [userId, setUserId] = useState('');
  const [bookId, setBookId] = useState('');
  const [isCheckoutDialogOpen, setCheckoutDialogOpen] = useState(false);
  const [isSnackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleCheckout = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/checkouts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, bookId }),
      });

      if (response.ok) {
        setSnackbarMessage('Book checked out successfully');
        setSnackbarOpen(true);
        setCheckoutDialogOpen(false);
      } else {
        setSnackbarMessage('Failed to check out book');
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error('Error checking out book:', error);
      setSnackbarMessage('Failed to check out book');
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={() => setCheckoutDialogOpen(true)}>
        Check Out Book
      </Button>

      {/* Checkout Dialog */}
      <Dialog open={isCheckoutDialogOpen} onClose={() => setCheckoutDialogOpen(false)}>
        <DialogTitle>Check Out Book</DialogTitle>
        <DialogContent>
          <TextField
            label="User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Book ID"
            value={bookId}
            onChange={(e) => setBookId(e.target.value)}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCheckout} color="primary">
            Check Out
          </Button>
          <Button onClick={() => setCheckoutDialogOpen(false)} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for feedback messages */}
      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
    </div>
  );
};

export default Checkout;
