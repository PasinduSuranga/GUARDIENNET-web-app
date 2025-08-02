const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const protect = require('../middleware/authMiddleware');
const User = require('../models/user');

// ✅ Setup Nodemailer with Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS
  }
});

// ========== SEND VERIFICATION EMAIL (BEFORE REGISTRATION) ==========
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  console.log("✅ Incoming data:", req.body);


  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: 'Email already registered' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const token = jwt.sign(
      { username, email, password: hashedPassword },
      process.env.JWT_EMAIL_SECRET,
      { expiresIn: '15m' }
    );

    const verifyUrl = `${process.env.BACKEND_URL}/api/auth/verify/${token}`;

    const html = `
      <h2>Welcome to GuardianNet</h2>
      <p>Click below to verify your email and complete registration:</p>
      <a href="${verifyUrl}">${verifyUrl}</a>
      <p>This link expires in 15 minutes.</p>
    `;

    const mailOptions = {
      from: `"GuardianNet" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: 'Verify your email',
      html,
    };

    await transporter.sendMail(mailOptions);
    console.log("📧 Verification email sent to:", email);

    res.status(200).json({ message: 'Verification email sent. Please check your inbox.' });

  } catch (err) {
    console.error('Register Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ========== VERIFY EMAIL & COMPLETE REGISTRATION ==========
router.get("/verify/:token", async (req, res) => {
  try {
    const { token } = req.params;
    const decoded = jwt.verify(token, process.env.JWT_EMAIL_SECRET);
    const { username, email, password } = decoded;

    console.log("✅ Decoded JWT:", decoded);

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      // If already registered, redirect to login with query flag
      return res.redirect(`${process.env.FRONTEND_URL}/login?alreadyVerified=true`);
    }

    const newUser = new User({
      username,
      email,
      password,
      isVerified: true,
    });

    await newUser.save();

    // ✅ Redirect to login page with success flag
    res.redirect(`${process.env.FRONTEND_URL}/login?verified=true`);
  } catch (err) {
    console.error("Verification Error:", err);
    res.status(400).send("❌ Invalid or expired link");
  }
});


// ========== LOGIN ==========
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password)))
      return res.status(400).json({ message: 'Invalid email or password' });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// ========== FORGOT PASSWORD ==========
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: 'User with this email does not exist' });

    const resetToken = user.generatePasswordResetToken();
    await user.save();

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    const mailOptions = {
      from: `"GuardianNet" <${process.env.GMAIL_USER}>`,
      to: user.email,
      subject: 'Reset Your Password',
      html: `
        <h3>Hello ${user.username},</h3>
        <p>Click the link below to reset your password:</p>
        <a href="${resetUrl}">${resetUrl}</a>
        <p>This link expires in 10 minutes.</p>
      `
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Reset password email sent' });

  } catch (error) {
    console.error('Forgot Password Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// ========== RESET PASSWORD ==========
router.post('/reset-password/:token', async (req, res) => {
  const { newPassword } = req.body;
  const resetTokenHash = crypto.createHash('sha256').update(req.params.token).digest('hex');

  try {
    const user = await User.findOne({
      resetPasswordToken: resetTokenHash,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user)
      return res.status(400).json({ message: 'Invalid or expired token' });

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    console.error('Reset Password Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
