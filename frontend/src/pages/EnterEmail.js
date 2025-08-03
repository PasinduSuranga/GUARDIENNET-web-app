import React, { useState } from 'react';
import axios from 'axios';

const EnterEmail = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState({ loading: false, message: '', error: false });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      const msg = 'Please enter your email';
      setStatus({ loading: false, message: msg, error: true });
      alert(msg);
      return;
    }

    try {
      setStatus({ loading: true, message: '', error: false });

      const res = await axios.post('http://localhost:5000/api/auth/forgot-password', { email });

      const successMsg = res.data.message || 'Reset email sent successfully!';
      setStatus({ loading: false, message: successMsg, error: false });
      alert(successMsg);
    } catch (error) {
      const errMsg = error.response?.data?.message || 'Something went wrong';
      setStatus({ loading: false, message: errMsg, error: true });
      alert(errMsg);
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.title}>Forgot Password</h2>
        <p style={styles.description}>Enter your registered email to receive a password reset link.</p>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
          required
        />

        <button type="submit" disabled={status.loading} style={styles.button}>
          {status.loading ? 'Sending...' : 'Send Reset Link'}
        </button>

        {status.message && (
          <p style={{ color: status.error ? '#d9534f' : '#28a745', marginTop: 15, fontWeight: '600' }}>
            {status.message}
          </p>
        )}
      </form>
    </div>
  );
};

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
    boxShadow: '0 10px 30px rgba(0,0,0,0.12)',
    width: '100%',
    maxWidth: 400,
    textAlign: 'center',
  },
  title: {
    marginBottom: 15,
    fontSize: '2rem',
    color: '#222',
    fontWeight: '700',
  },
  description: {
    marginBottom: 25,
    fontSize: '1rem',
    color: '#555',
  },
  input: {
    width: '100%',
    padding: 14,
    marginBottom: 20,
    borderRadius: 8,
    border: '1.8px solid #ccc',
    fontSize: '1rem',
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
    fontSize: '1.1rem',
    cursor: 'pointer',
    boxShadow: '0 5px 15px rgba(0,123,255,0.3)',
    transition: 'background-color 0.3s ease',
  },
};

export default EnterEmail;
