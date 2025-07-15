const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const SECRET_KEY = process.env.SECRET_KEY;

const USERS_FILE = path.join(__dirname, 'users.json');
const DATA_FILE = path.join(__dirname, 'data.json');

app.use(cors());
app.use(bodyParser.json());

// Helper to read/write files
const readJSON = (file) => JSON.parse(fs.existsSync(file) ? fs.readFileSync(file) : '[]');
const writeJSON = (file, data) => fs.writeFileSync(file, JSON.stringify(data, null, 2));

// Middleware to verify JWT
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);
  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// Register
app.post('/register', (req, res) => {
  const { username, password } = req.body;
  const users = readJSON(USERS_FILE);
  if (users.find(u => u.username === username)) {
    return res.status(400).json({ message: 'User already exists' });
  }
  users.push({ username, password });
  writeJSON(USERS_FILE, users);
  res.json({ message: 'Registration successful' });
});

// Login
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // 🔐 Validate input
  if (!username || !password || typeof username !== 'string' || typeof password !== 'string') {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  const users = readJSON(USERS_FILE);
  const userIndex = users.findIndex(
    (u) => u.username === username && u.password === password
  );

  if (userIndex === -1) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
  users[userIndex].token = token;
  writeJSON(USERS_FILE, users);

  res.json({ message: 'Login successful', token });
});


// Save JSON data (protected)
app.post('/save', authenticateToken, (req, res) => {
  const data = req.body;
  writeJSON(DATA_FILE, data);
  res.json({ message: 'Data saved successfully' });
});

// Read JSON data (protected)
app.get('/read', authenticateToken, (req, res) => {
  const data = readJSON(DATA_FILE);
  res.json(data);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
