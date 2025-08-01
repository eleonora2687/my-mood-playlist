// server/controllers/authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const register = (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Please provide username, email, and password' });
  }

  userModel.findUserByEmail(email, (err, results) => {
    if (err) {
      console.error('DB error during user lookup:', err);
      return res.status(500).json({ message: 'Database error' });
    }

    if (results.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        console.error('Error hashing password:', err);
        return res.status(500).json({ message: 'Error hashing password' });
      }

      userModel.createUser(username, email, hash, (err, result) => {
        if (err) {
          console.error('Error saving user:', err);
          return res.status(500).json({ message: 'Error saving user' });
        }
        res.status(201).json({ message: 'User registered successfully' });
      });
    });
  });
};

const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Please provide email and password' });
  }

  userModel.findUserByEmail(email, (err, results) => {
    if (err) {
      console.error('DB error during user lookup:', err);
      return res.status(500).json({ message: 'Database error' });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = results[0];

    // Log for debugging
    console.log('Login attempt for user:', email);
    console.log('Stored hash:', user.password_hash);

    bcrypt.compare(password, user.password_hash, (err, isMatch) => {
      if (err) {
        console.error('bcrypt compare error:', err);
        return res.status(500).json({ message: 'Error during password comparison' });
      }

      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      res.json({ token, username: user.username });
    });
  });
};

module.exports = {
  register,
  login,
};
