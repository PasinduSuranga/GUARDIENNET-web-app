// src/pages/Login.js
import React, { useState } from 'react';

function Login() {
  const [user, setUser] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // This is just a mock function
    setMessage('Login success!'); 
  };

  const handleForgotPassword = () => {
    alert('Redirecting to password reset page...');
    // Later you can navigate or open a reset page here
  };

  return (
    <div>
      <h2 className="page-title">Login to Guardian Net</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required /><br />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required /><br />
        <button type="submit">Login</button>
        <button type="button" onClick={handleForgotPassword} style={{ marginTop: '10px', backgroundColor: '#444', color: '#fff' }}>
          Forgot Password?
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Login;
