const express = require('express');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Mock database

// Routes
app.post('/register', (req, res) => {
  res.status(200).json({ message: 'register successful' });
});

app.post('/login', (req, res) => {
  res.status(200).json({ message: 'Login successful' });
});
app.get('/users', (req, res) => {
  res.status(200).json({ message: 'buscar usuários' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});