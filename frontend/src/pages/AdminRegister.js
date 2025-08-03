import React, { useState } from 'react';
import axios from 'axios';

function AdminRegister() {
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      await axios.post('http://localhost:5000/api/auth/register-admin', user); // ✅ Changed endpoint
      alert('✅ Admin verification email sent. Please check your inbox.');

      setUser({ username: '', email: '', password: '' });
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        alert('❌ ' + err.response.data.message);
      } else {
        alert('❌ An error occurred. Please try again later.');
      }
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Register as Admin</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          name="username"
          placeholder="Username"
          onChange={handleChange}
          value={user.username}
          required
          style={styles.input}
        /><br />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={user.email}
          required
          style={styles.input}
        /><br />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          value={user.password}
          required
          style={styles.input}
        /><br />
        <button type="submit" style={styles.button}>Register as Admin</button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 400,
    margin: '60px auto',
    padding: 30,
    backgroundColor: '#fff',
    borderRadius: 16,
    boxShadow: '0 10px 30px rgba(0,0,0,0.12)',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    textAlign: 'center',
  },
  title: {
    marginBottom: 30,
    fontSize: '2rem',
    color: '#222',
    fontWeight: '700',
    letterSpacing: '1px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    padding: 14,
    marginBottom: 20,
    borderRadius: 8,
    border: '1.8px solid #ccc',
    fontSize: '1rem',
    outline: 'none',
    transition: 'border-color 0.3s ease',
  },
  button: {
    padding: '14px 0',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    fontWeight: '600',
    fontSize: '1.1rem',
    cursor: 'pointer',
    boxShadow: '0 5px 15px rgba(0,123,255,0.3)',
    transition: 'background-color 0.3s ease',
  }
};

export default AdminRegister;
