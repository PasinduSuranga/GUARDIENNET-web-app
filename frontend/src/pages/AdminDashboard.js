import React from 'react';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');  // Already redirecting to login page on logout
  };

  const handleChangePassword = () => {
    navigate('/reset-password'); // Assuming this is your reset password route
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Admin Dashboard</h1>

      <div style={styles.buttonContainer}>
        <button style={styles.changePasswordBtn} onClick={handleChangePassword}>
          Change Password
        </button>

        <button style={styles.logoutBtn} onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: 40,
    maxWidth: 600,
    margin: '80px auto',
    textAlign: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.12)',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  title: {
    marginBottom: 40,
    fontSize: '2.5rem',
    color: '#222',
    fontWeight: '700',
    letterSpacing: '1.5px',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: 30,
  },
  changePasswordBtn: {
    padding: '14px 36px',
    fontSize: '1.1rem',
    borderRadius: 8,
    border: '2px solid #007bff',
    backgroundColor: '#fff',
    color: '#007bff',
    cursor: 'pointer',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 8px rgba(0, 123, 255, 0.2)',
  },
  logoutBtn: {
    padding: '14px 36px',
    fontSize: '1.1rem',
    borderRadius: 8,
    border: '2px solid #dc3545',
    backgroundColor: '#dc3545',
    color: '#fff',
    cursor: 'pointer',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 8px rgba(220, 53, 69, 0.3)',
  },
};

export default AdminDashboard;
