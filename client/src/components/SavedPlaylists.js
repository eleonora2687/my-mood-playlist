// src/components/SavedPlaylists.js
import React, { useEffect, useState } from 'react';

const SavedPlaylists = () => {
  const [playlists, setPlaylists] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPlaylists = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setError('You must be logged in.');
        return;
      }

      try {
        const response = await fetch('http://localhost:5000/api/playlist/saved', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Something went wrong');
        }

        const data = await response.json();
        setPlaylists(data.playlists || []);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchPlaylists();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this playlist?')) return;

    try {
      const response = await fetch(`http://localhost:5000/api/playlist/delete/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const result = await response.json();

      if (!response.ok) throw new Error(result.message || 'Failed to delete playlist');

      setPlaylists(playlists.filter(p => p.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="container mt-4">
      <h2>Saved Playlists</h2>
      {playlists.length === 0 ? (
        <p>No playlists found.</p>
      ) : (
        playlists.map((playlist, index) => (
          <div key={index} className="card mb-3">
            <div className="card-body">
              <h5 className="card-title">{playlist.name}</h5>
              <p><strong>Mood:</strong> {playlist.mood}</p>
              <ul>
                {playlist.tracks.map((track, i) => (
                  <li key={i}>
                    {track.title} - {track.artist}
                    {track.spotifyUrl && (
                      <a
                        href={track.spotifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-sm btn-outline-success ms-2"
                      >
                        Open in Spotify
                      </a>
                    )}
                  </li>
                ))}
              </ul>

              <button
                className="btn btn-danger btn-sm mt-2"
                onClick={() => handleDelete(playlist.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default SavedPlaylists;
