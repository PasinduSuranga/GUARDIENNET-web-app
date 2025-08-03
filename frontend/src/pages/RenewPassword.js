import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({ newPassword: '', confirmNewPassword: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.newPassword || !form.confirmNewPassword) {
      alert('Please fill in all fields.');
      return;
    }

    if (form.newPassword !== form.confirmNewPassword) {
      alert('Passwords do not match.');
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(`http://localhost:5000/api/auth/renew-password/${token}`, {
        newPassword: form.newPassword,
        confirmNewPassword: form.confirmNewPassword,
      });

      alert(res.data.message || 'Password reset successful!');
      navigate('/login');
    } catch (error) {
      alert(error.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.title}>Reset Password</h2>

        <input
          type="password"
          name="newPassword"
          placeholder="New Password"
          value={form.newPassword}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <input
          type="password"
          name="confirmNewPassword"
          placeholder="Confirm New Password"
          value={form.confirmNewPassword}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? 'Resetting...' : 'Reset Password'}
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  form: {
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 16,
    boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: 400,
    textAlign: 'center',
  },
  title: {
    marginBottom: 20,
    fontSize: '2rem',
    color: '#222',
    fontWeight: '700',
  },
  input: {
    width: '100%',
    padding: 14,
    margin: '10px 0',
    borderRadius: 8,
    border: '1.8px solid #ccc',
    fontSize: 16,
    outline: 'none',
    transition: 'border-color 0.3s ease',
  },
  button: {
    width: '100%',
    padding: 14,
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    fontWeight: '600',
    fontSize: 16,
    cursor: 'pointer',
    boxShadow: '0 5px 15px rgba(0,123,255,0.3)',
    transition: 'background-color 0.3s ease',
  },
};

export default ResetPassword;
