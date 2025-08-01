// server/services/spotifyService.js
const axios = require('axios');
const qs = require('qs');

const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

let accessToken = null;
let tokenExpiresAt = 0;

async function getSpotifyAccessToken() {
  const now = Date.now();
  if (accessToken && now < tokenExpiresAt) {
    return accessToken;
  }

  const tokenUrl = 'https://accounts.spotify.com/api/token';
  const data = qs.stringify({ grant_type: 'client_credentials' });
  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  const response = await axios.post(tokenUrl, data, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${auth}`
    }
  });

  accessToken = response.data.access_token;
  tokenExpiresAt = now + response.data.expires_in * 1000;

  return accessToken;
}

// Correct export with matching function name
module.exports = { getSpotifyAccessToken };
