import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from './utils/api';
import { setToken } from './utils/auth';

function Signin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignin = async () => {
    try {
      const response = await api.post('/auth/signin', { username, password });
      setToken(response.data);
      setError('');
      navigate('/');
    } catch (err) {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="container">
      <h1>Sign In to TaskVibe</h1>
      <div className="form auth-form">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <div className="error-message">{error}</div>}
        <button onClick={handleSignin}>Sign In</button>
        <p>
          Don't have an account? <a href="/signup" className="auth-link">Sign Up</a>
        </p>
      </div>
    </div>
  );
}

export default Signin;