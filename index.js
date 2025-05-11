const express = require('express');
const { default: axios } = require('axios');
const db = require('./database');
const User = require('./user'); // Importando o modelo User
const { AuthMiddleware } = require('./auth'); // Importando o middleware de autenticação
const bcrypt = require('bcrypt');
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Mock database
db.sync()
  .then(() => {
    console.log('Database connected');
  })
  .catch((err) => {
    console.error('Database connection error:', err);
  });

// Routes

app.post('/register', async (req, res) => {
  try {
    const { name, email } = req.body;
    const password = bcrypt.hashSync(req.body.password, 10);
    const user = await User.create({ name, email, password })
    res.status(200).json(user);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/users', AuthMiddleware, async (req, res) => {
  const response = await axios.get('http://localhost:3000/users');
  res.status(200).json(response.data);
});


app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/users', AuthMiddleware, async (req, res) => {

  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ message: 'Preencha todos os campos obrigatórios' });
  }
  try {
    const response = await axios.post('http://localhost:3000/users', {
      name,
      email,
      password,
    });
    res
      .status(201)
      .json({ message: 'Usuário criado com sucesso', data: response.data });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Erro ao criar usuário', error: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});