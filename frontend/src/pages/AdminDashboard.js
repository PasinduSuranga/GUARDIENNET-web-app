import React from 'react';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');  // Already redirecting to login page on logout
  };

  // Updated this to reset-password or change-password route as you prefer
  const handleChangePassword = () => {
    navigate('/reset-password'); // <-- Change this to your actual reset password route if different
  };

  return (
    <div style={styles.container}>
      <h1>Admin Dashboard</h1>

      <div style={styles.buttonContainer}>
        <button style={styles.button} onClick={handleChangePassword}>
          Change Password
        </button>

        <button style={{ ...styles.button, backgroundColor: '#dc3545' }} onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: 30,
    maxWidth: 600,
    margin: '50px auto',
    textAlign: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
  },
  buttonContainer: {
    marginTop: 30,
    display: 'flex',
    justifyContent: 'center',
    gap: 20,
  },
  button: {
    padding: '12px 24px',
    fontSize: 16,
    borderRadius: 5,
    border: 'none',
    backgroundColor: '#007bff',
    color: '#fff',
    cursor: 'pointer',
  },
};

export default AdminDashboard;
