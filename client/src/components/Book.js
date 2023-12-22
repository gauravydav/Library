import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from "@mui/material";
import Header from "./Header";

const Book = () => {
  const [books, setBooks] = useState([]);
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [isbn, setIsbn] = useState("");
  const [publishedAt, setPublishedAt] = useState("");
  const [copies, setCopies] = useState("");
  const [isCreateDialogOpen, setCreateDialogOpen] = useState(false);
  const [isUpdateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    // Fetch data from the API
    fetch("http://localhost:5000/books/api/books")
      .then((response) => response.json())
      .then((data) => setBooks(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleCreate = () => {
    // Perform create operation and update the state
    fetch("http://localhost:5000/books/api/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        title,
        author,
        isbn,
        published_at: publishedAt,
        copies,
      }),
    })
      .then((response) => response.json())
      .then((newBook) => setBooks([...books, newBook]))
      .catch((error) => console.error("Error creating book:", error));

    setCreateDialogOpen(false);
    setId("");
    setTitle("");
    setAuthor("");
    setIsbn("");
    setPublishedAt("");
    setCopies("");
    window.location.reload()
  };

  const handleUpdate = () => {
    if (!selectedBook) return;

    // Perform update operation and update the state
    fetch(`http://localhost:5000/books/api/books/${selectedBook._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        author,
        isbn,
        published_at: publishedAt,
        copies,
      }),
    })
      .then((response) => response.json())
      .then((updatedBook) => {
        const updatedBooks = books.map((book) =>
          book._id === updatedBook._id ? updatedBook : book
        );
        setBooks(updatedBooks);
      })
      .catch((error) => console.error("Error updating book:", error));

    setUpdateDialogOpen(false);
    setSelectedBook(null);
    setId("");
    setTitle("");
    setAuthor("");
    setIsbn("");
    setPublishedAt("");
    setCopies("");
    window.location.reload()
  };

  const handleOpenUpdateDialog = (book) => {
    setSelectedBook(book);
    setId(book.id);
    setTitle(book.title);
    setAuthor(book.author);
    setIsbn(book.isbn);
    setPublishedAt(book.published_at);
    setCopies(book.copies);
    setUpdateDialogOpen(true);
  };

  const handleCloseUpdateDialog = () => {
    setUpdateDialogOpen(false);
    setSelectedBook(null);
    setId("");
    setTitle("");
    setAuthor("");
    setIsbn("");
    setPublishedAt("");
    setCopies("");
  };

  const handleDelete = (id) => {
    // Perform delete operation and update the state
    fetch(`http://localhost:5000/books/api/books/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        const updatedBooks = books.filter((book) => book._id !== id);
        setBooks(updatedBooks);
      })
      .catch((error) => console.error("Error deleting book:", error));
  };

  return (
    <div style={{ display: "flex" }}>
      <div>
        <Header />
      </div>
      <div>
        <h2>Books</h2>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setCreateDialogOpen(true)}
        >
          Create
        </Button>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Author</TableCell>
                <TableCell>ISBN</TableCell>
                <TableCell>Published At</TableCell>
                <TableCell>Copies</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {books.map((book) => (
                <TableRow key={book._id}>
                  <TableCell>{book.id}</TableCell>
                  <TableCell>{book.title}</TableCell>
                  <TableCell>{book.author}</TableCell>
                  <TableCell>{book.isbn}</TableCell>
                  <TableCell>{book.published_at}</TableCell>
                  <TableCell>{book.copies}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => handleOpenUpdateDialog(book)}
                    >
                      Update
                    </Button>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => handleDelete(book._id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Create Dialog */}
        <Dialog
          open={isCreateDialogOpen}
          onClose={() => setCreateDialogOpen(false)}
        >
          <DialogTitle>Create Book</DialogTitle>
          <DialogContent>
            <TextField
              label="ID"
              value={id}
              onChange={(e) => setId(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="ISBN"
              value={isbn}
              onChange={(e) => setIsbn(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Published At"
              value={publishedAt}
              onChange={(e) => setPublishedAt(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Copies"
              value={copies}
              onChange={(e) => setCopies(e.target.value)}
              fullWidth
              margin="normal"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCreate} color="primary">
              Create
            </Button>
            <Button
              onClick={() => setCreateDialogOpen(false)}
              color="secondary"
            >
              Cancel
            </Button>
          </DialogActions>
        </Dialog>

        {/* Update Dialog */}
        <Dialog open={isUpdateDialogOpen} onClose={handleCloseUpdateDialog}>
          <DialogTitle>Update Book</DialogTitle>
          <DialogContent>
            <TextField
              label="ID"
              value={id}
              onChange={(e) => setId(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="ISBN"
              value={isbn}
              onChange={(e) => setIsbn(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Published At"
              value={publishedAt}
              onChange={(e) => setPublishedAt(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Copies"
              value={copies}
              onChange={(e) => setCopies(e.target.value)}
              fullWidth
              margin="normal"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleUpdate} color="primary">
              Update
            </Button>
            <Button onClick={handleCloseUpdateDialog} color="secondary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default Book;
