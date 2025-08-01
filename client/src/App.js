import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Moods from './components/Moods';
import PrivateRoute from './components/PrivateRoute';

import logo from './logo.svg';
import './App.css';

function App() {
  const token = localStorage.getItem('token');

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={token ? <Navigate to="/moods" /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={token ? <Navigate to="/moods" /> : <Login onLoginSuccess={() => window.location.href = '/moods'} />}
        />
        <Route
          path="/register"
          element={token ? <Navigate to="/moods" /> : <Register onRegisterSuccess={() => window.location.href = '/login'} />}
        />

        <Route path="/moods" element={
  <PrivateRoute>
    <Moods />
  </PrivateRoute>
} />
        
      </Routes>
    </Router>
  );
}

export default App;
