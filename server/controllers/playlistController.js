// server/controllers/playlistController.js
const axios = require('axios');
const { getSpotifyAccessToken } = require('../services/spotifyService');

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
        limit: 10
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



module.exports = { generatePlaylist };
