import React from 'react';
import { useNavigate } from 'react-router-dom';

function SelectRegisterType() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <h2>Register As</h2>
      <button style={styles.button} onClick={() => navigate('/register')}>
        Register as User
      </button>
      <button style={styles.button} onClick={() => navigate('/adminregister')}>
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
    gap: '20px',
  },
  button: {
    padding: '12px 20px',
    fontSize: '18px',
    cursor: 'pointer',
    borderRadius: '6px',
    border: '1px solid #ccc',
    backgroundColor: '#007bff',
    color: 'white',
  },
};

export default SelectRegisterType;
