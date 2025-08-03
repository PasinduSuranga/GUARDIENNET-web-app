// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      width: '100vw',
      backgroundColor: '#1a1a1a',
      color: '#ffffff',
      padding: '10px 20px',
      zIndex: 1000,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxSizing: 'border-box'
    }}>
      <h2 style={{ margin: 0 }}>Guardient Net</h2>
      <div>
        <Link to="/" style={{ color: '#fff', marginRight: '15px', textDecoration: 'none' }}>Home</Link>
        <Link to="/select-register" style={{ color: '#fff', marginRight: '15px', textDecoration: 'none' }}>Register</Link>
        <Link to="/login" style={{ color: '#fff', textDecoration: 'none' }}>Login</Link>
      </div>
    </nav>
  );
}
