import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function Login() {
  const [selectedRole, setSelectedRole] = useState(null);
  const [user, setUser] = useState({ email: '', password: '' });
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("verified") === "true") {
      alert("✅ Email verified! You can now log in.");
      navigate('/login', { replace: true });
    } else if (params.get("alreadyVerified") === "true") {
      alert("ℹ️ Email already verified. Please log in.");
      navigate('/login', { replace: true });
    }
  }, [location, navigate]);

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Login success as ${selectedRole}!`);
    navigate('/dashboard');
  };

  const handleForgotPassword = () => {
    alert('Redirecting to password reset page...');
  };

  const cardStyle = {
    backgroundColor: '#02212eff', // light pastel blue like caregivers card
    borderRadius: '12px',
    padding: '30px',
    textAlign: 'center',
    width: '200px',
    cursor: 'pointer',
    boxShadow: '2px 2px 10px #aaa',
    margin: '10px',
    userSelect: 'none',
    fontWeight: '600',
    fontSize: '18px',
    color: '#e3eaeeff',
  };

  const cardContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '50px',
  };

  const backButtonStyle = {
    marginTop: '15px',
    width: '100%',
    padding: '10px',
    backgroundColor: '#eee',
    border: 'none',
    borderRadius: '4px',
    fontSize: '14px',
    cursor: 'pointer',
    color: '#333',
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px' }}>
      {!selectedRole ? (
        <>
          <h2 style={{ textAlign: 'center' }}>Login as</h2>
          <div style={cardContainerStyle}>
            <div
              style={cardStyle}
              onClick={() => handleRoleSelect('admin')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if(e.key === 'Enter') handleRoleSelect('admin'); }}
            >
              Admin
            </div>
            <div
              style={cardStyle}
              onClick={() => handleRoleSelect('user')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if(e.key === 'Enter') handleRoleSelect('user'); }}
            >
              User
            </div>
          </div>
        </>
      ) : (
        <>
          <h2 className="page-title" style={{ textAlign: 'center' }}>
            Login as {selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)}
          </h2>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              value={user.email}
              required
              style={{ width: '100%', padding: '10px', marginBottom: '15px' }}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              value={user.password}
              required
              style={{ width: '100%', padding: '10px', marginBottom: '15px' }}
            />
            <button
              type="submit"
              style={{
                width: '100%',
                padding: '12px',
                backgroundColor: '#007bff',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                fontSize: '16px',
              }}
            >
              Login
            </button>
            <button
              type="button"
              onClick={handleForgotPassword}
              style={{
                marginTop: '10px',
                width: '100%',
                padding: '12px',
                backgroundColor: '#444',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                fontSize: '16px',
              }}
            >
              Forgot Password?
            </button>
            <button
              type="button"
              onClick={() => setSelectedRole(null)}
              style={backButtonStyle}
            >
              Back
            </button>
          </form>
        </>
      )}
    </div>
  );
}

export default Login;
