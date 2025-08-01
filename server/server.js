const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Middlewares first
app.use(cors());
app.use(express.json()); // Parses incoming JSON requests

// ✅ Routes after middleware
const playlistRoutes = require('./routes/playlistRoutes');
app.use('/api/playlist', playlistRoutes);

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

const moodRoutes = require('./routes/moodRoutes');
app.use('/api/moods', moodRoutes);

// Optional test route
app.get('/', (req, res) => {
  res.send('🎵 MyMoodPlaylist Backend is running');
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is listening on port ${PORT}`);
});
