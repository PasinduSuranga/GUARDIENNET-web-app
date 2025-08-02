// src/pages/Login.js
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function Login() {
  const [user, setUser] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("verified") === "true") {
      alert("✅ Email verified! You can now log in.");
      navigate('/login', { replace: true });
    } else if (params.get("alreadyVerified") === "true") {
      alert("ℹ️ Email already verified. Please log in.");
      navigate('/login', { replace: true });
    }
  }, [location, navigate]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    alert('Login success!');
    navigate('/dashboard');
  };

  const handleForgotPassword = () => {
    alert('Redirecting to password reset page...');
  };

  return (
    <div>
      <h2 className="page-title">Login to Guardian Net</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={user.email}
          required
        /><br />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          value={user.password}
          required
        /><br />
        <button type="submit">Login</button>
        <button
          type="button"
          onClick={handleForgotPassword}
          style={{ marginTop: '10px', backgroundColor: '#444', color: '#fff' }}
        >
          Forgot Password?
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Login;
