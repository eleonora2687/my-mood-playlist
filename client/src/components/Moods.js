import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const moodOptions = ['Happy', 'Sad', 'Energetic', 'Chill'];

export default function Moods() {
  const username = localStorage.getItem('username');
  const navigate = useNavigate();

  const [selectedMood, setSelectedMood] = useState('');
  const [playlist, setPlaylist] = useState([]);
  const [message, setMessage] = useState('');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/login');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedMood) {
      setMessage('Please select a mood');
      return;
    }

    try {
      const token = localStorage.getItem('token');

      const response = await fetch('http://localhost:5000/api/playlist/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ mood: selectedMood })
      });


      console.log('Token:', localStorage.getItem('token'));

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || 'Something went wrong');
        return;
      }

      setPlaylist(data.tracks || []);
      setMessage('');
    } catch (err) {
      console.error('Fetch error:', err);
      setMessage('Error fetching playlist');
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: 600 }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Welcome, {username}</h2>
        <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
      </div>

      <h3 className="mb-3">🎵 Generate Playlist by Mood</h3>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Select Mood</label>
          <select
            className="form-select"
            value={selectedMood}
            onChange={(e) => setSelectedMood(e.target.value)}
          >
            <option value="">-- Choose --</option>
            {moodOptions.map((mood) => (
              <option key={mood} value={mood}>{mood}</option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn btn-primary">Generate Playlist</button>
      </form>

      {message && <div className="alert alert-warning mt-3">{message}</div>}

      {playlist.length > 0 && (
        <div className="mt-4">
          <h4>🎧 Playlist for "{selectedMood}"</h4>
          <ul className="list-group">
            {playlist.map((track, idx) => (
              <li key={idx} className="list-group-item">
                <strong>{track.title}</strong> by {track.artist}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
