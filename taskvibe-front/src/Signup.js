import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from './utils/api';

function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      await api.post('/auth/signup', { username, email, password });
      setError('');
      navigate('/signin');
    } catch (err) {
      setError(err.response?.data || 'Registration failed');
    }
  };

  return (
    <div className="container">
      <h1>Sign Up for TaskVibe</h1>
      <div className="form auth-form">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <div className="error-message">{error}</div>}
        <button onClick={handleSignup}>Sign Up</button>
        <p>
          Already have an account? <a href="/signin" className="auth-link">Sign In</a>
        </p>
      </div>
    </div>
  );
}

export default Signup;