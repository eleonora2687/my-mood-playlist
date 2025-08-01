const express = require('express');
const router = express.Router();
const { generatePlaylist } = require('../controllers/playlistController');
const verifyToken = require('../middleware/authMiddleware'); // ✅ correct import

// ✅ Only this line is needed now
router.post('/generate', verifyToken, generatePlaylist);

module.exports = router;
