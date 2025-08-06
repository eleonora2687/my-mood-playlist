// server/controllers/playlistController.js
const axios = require('axios');
const db = require('../config/db');

const { getSpotifyAccessToken } = require('../services/spotifyService');
const offset = Math.floor(Math.random() * 50); // randomize search results

const generatePlaylist = async (req, res) => {

  console.log('Playlist request by user:', req.user); // from auth middleware
  console.log('Mood requested:', req.body.mood);
  const { mood } = req.body;

  try {
    const token = await getSpotifyAccessToken();

    const response = await axios.get(`https://api.spotify.com/v1/search`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        q: mood,
        type: 'track',
        limit: 10,
        offset 
      }
    });

    const tracks = response.data.tracks.items.map(track => ({
      title: track.name,
      artist: track.artists[0]?.name || 'Unknown'
    }));

    return res.json({ tracks });  // <-- return here so function ends

  } catch (err) {
    console.error('Error fetching from Spotify:', err.message);

    if (!res.headersSent) {
      return res.status(500).json({ message: 'Failed to fetch from Spotify' });
    }
    // No need for else, just silently fail if headers already sent
  }
};


const savePlaylist = (req, res) => {
  const { mood, name, tracks } = req.body;
  const userId = req.user.id;

  if (!mood || !name || !tracks) {
    return res.status(400).json({ message: 'Missing data' });
  }

  const sql = 'INSERT INTO saved_playlists (user_id, mood, name, tracks) VALUES (?, ?, ?, ?)';
  db.query(sql, [userId, mood, name, JSON.stringify(tracks)], (err, result) => {
    if (err) {
      console.error('Error saving playlist:', err);
      return res.status(500).json({ message: 'Database error' });
    }
    res.status(201).json({ message: 'Playlist saved successfully' });
  });
};


const getSavedPlaylists = (req, res) => {
  const userId = req.user.id;

  const sql = 'SELECT id, mood, name, tracks FROM saved_playlists WHERE user_id = ? ORDER BY id DESC';
  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error('Error fetching saved playlists:', err);
      return res.status(500).json({ message: 'Database error' });
    }

    const playlists = results.map(row => ({
      id: row.id,
      mood: row.mood,
      name: row.name,
      tracks: JSON.parse(row.tracks)
    }));

    res.json({ playlists });
  });
};

const deletePlaylist = (req, res) => {
  const playlistId = req.params.id;
  const userId = req.user.id;

  const sql = 'DELETE FROM saved_playlists WHERE id = ? AND user_id = ?';
  db.query(sql, [playlistId, userId], (err, result) => {
    if (err) {
      console.error('Error deleting playlist:', err);
      return res.status(500).json({ message: 'Database error' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Playlist not found or unauthorized' });
    }
    res.json({ message: 'Playlist deleted successfully' });
  });
};

module.exports = {
  generatePlaylist,
  savePlaylist,
  getSavedPlaylists,
  deletePlaylist 
};

