import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function ChangePassword() {
  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    // Basic validation
    if (form.newPassword !== form.confirmNewPassword) {
      setMessage("❌ New passwords do not match!");
      return;
    }

    if (!form.oldPassword || !form.newPassword) {
      setMessage("❌ Please fill all required fields.");
      return;
    }

    // TODO: Connect to backend API for password update here

    setMessage("✅ Password changed successfully!");
    // Optionally, navigate back or clear form
  };

  const handleBack = () => {
    navigate("/dashboard");
  };

  const inputStyle = {
    padding: "10px",
    margin: "10px 0",
    width: "100%",
    maxWidth: "300px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "16px",
  };

  const buttonStyle = {
    padding: "12px 24px",
    margin: "10px 10px 0 0",
    fontSize: "16px",
    fontWeight: "600",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
  };

  return (
    <div style={{ padding: "40px", maxWidth: "400px", margin: "auto", textAlign: "center" }}>
      <h2>Reset Password</h2>
      <form onSubmit={handleUpdate}>
        <input
          type="password"
          name="oldPassword"
          placeholder="Old Password"
          value={form.oldPassword}
          onChange={handleChange}
          style={inputStyle}
          required
        /><br />
        <input
          type="password"
          name="newPassword"
          placeholder="New Password"
          value={form.newPassword}
          onChange={handleChange}
          style={inputStyle}
          required
        /><br />
        <input
          type="password"
          name="confirmNewPassword"
          placeholder="Confirm New Password"
          value={form.confirmNewPassword}
          onChange={handleChange}
          style={inputStyle}
          required
        /><br />
        <button
          type="submit"
          style={{ ...buttonStyle, backgroundColor: "#3498db", color: "#fff" }}
        >
          Change Password
        </button>
        <button
          type="button"
          onClick={handleBack}
          style={{ ...buttonStyle, backgroundColor: "#777", color: "#fff" }}
        >
          Back
        </button>
      </form>
      {message && <p style={{ marginTop: "15px" }}>{message}</p>}
    </div>
  );
}

export default ChangePassword;
