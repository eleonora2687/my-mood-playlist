Here's the **completed and cleaned-up README** for your **Mood-Based Playlist Generator** project, ready for GitHub:

---

````markdown
# 🎵 Mood-Based Playlist Generator

This full-stack web app generates music playlists based on the user's mood using the Spotify API. Built with **React**, **Node.js**, **Express**, and **MySQL**.

---

## 🚀 Features

- ✅ Register / Login system (JWT-based authentication)
- 🎯 Generate playlists based on selected mood
- 🔗 Uses Spotify API to fetch real-time music data
- 📱 Responsive design with Bootstrap

---

## 🧠 Tech Stack

- **Frontend:** React, Bootstrap
- **Backend:** Node.js, Express
- **Database:** MySQL
- **Authentication:** JWT
- **External API:** Spotify Web API

---

## 🔧 Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/eleonora2687/my-mood-playlist.git
cd my-mood-playlist
````

---

### 2. Create a `.env` file in the `server/` directory

```bash
cd server
touch .env
```

Paste the following content and replace values accordingly:

```env
PORT=5000
DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=mood_playlist
JWT_SECRET=your_jwt_secret
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
```


### 3. Install dependencies

#### In the server folder:

```bash
cd server
npm install
```

#### In the client folder:

```bash
cd ../client
npm install
```

---

### 4. Start the app

#### Start backend (server):

```bash
cd server
npm run dev
```

#### Start frontend (client):

Open a new terminal:

```bash
cd client
npm start
```

Your app will be running at [http://localhost:3000](http://localhost:3000)

---

## 🧪 Optional: Create MySQL Database & Tables

You can manually create the database:

```sql
CREATE DATABASE mood_playlist;

USE mood_playlist;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100),
  email VARCHAR(255) UNIQUE,
  password_hash VARCHAR(255)
);
```


## 🤝 License

This project is open-source and free to use under the [MIT License](LICENSE).

```


