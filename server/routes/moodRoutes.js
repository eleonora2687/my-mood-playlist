// routes/moodRoutes.js
const express = require('express');
const router = express.Router();
const { getMoods } = require('../controllers/moodController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, getMoods);

module.exports = router; // ✅ This too
