const express = require('express');
const router = express.Router();
const playlistController = require('../controllers/playlistController');
const authenticateToken = require('../middleware/authMiddleware');

router.post('/generate', authenticateToken, playlistController.generatePlaylist);
router.post('/save', authenticateToken, playlistController.savePlaylist);


router.get('/saved', authenticateToken, playlistController.getSavedPlaylists);

router.delete('/delete/:id', authenticateToken, playlistController.deletePlaylist);

module.exports = router;
