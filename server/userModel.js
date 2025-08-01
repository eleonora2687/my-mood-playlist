// server/models/userModel.js
const db = require('../config/db');

const findUserByEmail = (email, callback) => {
  const sql = 'SELECT * FROM users WHERE email = ?';
  db.query(sql, [email], callback);
};

const createUser = (username, email, passwordHash, callback) => {
  const sql = 'INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)';
  db.query(sql, [username, email, passwordHash], callback);
};

module.exports = {
  findUserByEmail,
  createUser
};
