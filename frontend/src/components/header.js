// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <nav style={{
  position: 'fixed',
  top: 0,
  left: 0,                  // ✅ add this
  right: 0,                 // ✅ add this
  width: '100vw',           // ✅ full width of viewport
  backgroundColor: '#1a1a1a',
  color: '#ffffff',
  padding: '10px 20px',
  zIndex: 1000,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  boxSizing: 'border-box'   // ✅ ensures padding doesn't overflow
}}>

      <h2 style={{ margin: 0 }}>Guardient Net</h2>
      <div>
        <Link to="/" style={{ color: '#fff', marginRight: '15px', textDecoration: 'none' }}>Home</Link>
        <Link to="/register" style={{ color: '#fff', marginRight: '15px', textDecoration: 'none' }}>Register</Link>
        <Link to="/login" style={{ color: '#fff', textDecoration: 'none' }}>Login</Link>
      </div>
    </nav>
  );
}
