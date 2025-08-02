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
        <h2>Forgot Password</h2>
        <p>Enter your registered email to receive a password reset link.</p>

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
          <p style={{ color: status.error ? 'red' : 'green', marginTop: '10px' }}>
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
  },
  form: {
    backgroundColor: '#fff',
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '400px',
  },
  input: {
    width: '100%',
    padding: '12px',
    margin: '10px 0',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '16px',
  },
  button: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
  },
};

export default EnterEmail;
