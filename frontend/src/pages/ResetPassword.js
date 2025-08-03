import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ChangePassword() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validations
    if (!oldPassword || !newPassword || !confirmNewPassword) {
      alert('All fields are required');
      return;
    }

    if (newPassword === oldPassword) {
      alert('New password must be different from old password');
      return;
    }

    if (newPassword !== confirmNewPassword) {
      alert('New passwords do not match');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/auth/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          oldPassword,
          newPassword,
          confirmNewPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || 'Something went wrong');
        return;
      }

      alert('Password updated successfully!');
      localStorage.removeItem('token'); // logout
      navigate('/login'); // redirect to login
    } catch (error) {
      console.error('Error:', error);
      setMessage('Something went wrong');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Change Password</h2>
      {message && <p style={styles.error}>{message}</p>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Old Password:</label>
          <input
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>New Password:</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Confirm New Password:</label>
          <input
            type="password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            style={styles.input}
            required
          />
        </div>
        <button type="submit" style={styles.button}>Update Password</button>
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
    borderRadius: 12,
    boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  title: {
    textAlign: 'center',
    marginBottom: 24,
    fontWeight: '700',
    color: '#222',
    fontSize: '1.8rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  inputGroup: {
    marginBottom: 18,
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    marginBottom: 6,
    fontWeight: '600',
    color: '#444',
    fontSize: 14,
  },
  input: {
    padding: 12,
    borderRadius: 8,
    border: '1.8px solid #ccc',
    fontSize: 16,
    outline: 'none',
    transition: 'border-color 0.3s ease',
  },
  button: {
    marginTop: 10,
    padding: 14,
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    fontWeight: '700',
    fontSize: 16,
    cursor: 'pointer',
    boxShadow: '0 5px 15px rgba(0,123,255,0.3)',
    transition: 'background-color 0.3s ease',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 12,
  },
};

export default ChangePassword;
