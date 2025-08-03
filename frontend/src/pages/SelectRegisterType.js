import React from 'react';
import { useNavigate } from 'react-router-dom';

function SelectRegisterType() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Register As</h2>
      <button style={styles.button} onClick={() => navigate('/register')}>
        Register as User
      </button>
      <button style={{ ...styles.button, ...styles.adminButton }} onClick={() => navigate('/adminregister')}>
        Register as Admin
      </button>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    gap: 24,
    backgroundColor: '#f8f9fa',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    padding: '0 20px',
  },
  title: {
    fontSize: '2rem',
    marginBottom: 20,
    color: '#333',
  },
  button: {
    width: '220px',
    padding: '14px 0',
    fontSize: '18px',
    fontWeight: '600',
    cursor: 'pointer',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#007bff',
    color: 'white',
    boxShadow: '0 4px 12px rgba(0,123,255,0.3)',
    transition: 'background-color 0.3s ease, transform 0.2s ease',
  },
  adminButton: {
    backgroundColor: '#28a745',
    boxShadow: '0 4px 12px rgba(40,167,69,0.3)',
  },
};

export default SelectRegisterType;
