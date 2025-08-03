import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function Login() {
  const [user, setUser] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  // Show alert if redirected from email verification
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

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Something went wrong");
        alert("❌ " + (data.message || "Login failed"));
        return;
      }

      // Save the token and optionally the user info
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      alert("✅ " + (data.message || "Login successful!"));

      if (data.user.role === "admin") {
        navigate('/admin-dashboard');
      } else {
        navigate('/dashboard');
      }

    } catch (error) {
      console.error("Frontend login Error:", error);
      alert("❌ Network/Server error. Please try again later");
    }
  };

  const handleForgotPassword = () => {
    navigate('/forgot-password');
  };

  return (
    <div>
      <h2 className="page-title">Login to Guardian Net</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={user.email}
          required
        /><br />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          value={user.password}
          required
        /><br />
        <button type="submit">Login</button>
        <button
          type="button"
          onClick={handleForgotPassword}
          style={{ marginTop: '10px', backgroundColor: '#444', color: '#fff' }}
        >
          Forgot Password?
        </button>
      </form>
      {message && <p style={{ color: 'red' }}>{message}</p>}
    </div>
  );
}

export default Login;
