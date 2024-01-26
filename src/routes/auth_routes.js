/*const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (isValidUser(email, password)) {
    const token = jwt.sign({ email, role: getUserRole(email) }, 'secretKey', { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Invalid login' });
  }
});

const isValidUser = (email, password) => {
  return email === 'user@example.com' && password === 'password';
};

const getUserRole = (email) => {
  return email === 'admin@example.com' ? 'admin' : 'user';
};

module.exports = router;*/
// // Det gröna är mikaels kod. Jag har försökt jobba utifrån den.


require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const SecretKey = process.env.SECRET_KEY;

const router = express.Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Missing email or password' });
  }

  try {
    const user = getUserByEmail(email);

    if (!user) {
      return res.status(401).json({ error: 'Invalid user' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid login' });
    }

    const token = jwt.sign({ email, role: user.role }, SecretKey, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const getUserByEmail = (email) => {
  const users = [
    { email: process.env.ADMIN_EMAIL, passwordHash: process.env.ADMIN_PASSWORD_HASH, role: 'admin' },
    { email: process.env.USER_EMAIL, passwordHash: process.env.USER_PASSWORD_HASH, role: 'user' },
    // Add more users as needed
  ];

  return users.find(user => user.email === email);
};

module.exports = router;





