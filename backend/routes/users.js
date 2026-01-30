const express = require('express');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const auth = require('../middleware/auth');
const router = express.Router();

const jwtVerify = promisify(jwt.verify);

// Register user
router.post('/register', [
  body('name').trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters long'),
  body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array()[0].msg });
    }

    const { name, email, password, role = 'Job Seeker', profilePicUrl } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Create user (password hashing handled by pre-save hook)
    const user = new User({
      name,
      email,
      passwordHash: password, // Will be hashed by pre-save hook
      role,
      profilePicUrl
    });

    await user.save();

    // Generate access token
    const accessToken = jwt.sign({ id: user._id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });

    // Generate refresh token
    const refreshToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });

    // Hash refresh token and save to user
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 12);
    user.refreshToken = hashedRefreshToken;
    await user.save();

    res.status(201).json({
      message: 'User created',
      accessToken: accessToken,
      refreshToken,
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });
  } catch (err) {
    console.error('Error in register route:', err);
    res.status(400).json({ error: err.message });
  }
});

// Login
router.post('/login', [
  body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
  body('password').notEmpty().withMessage('Password is required'),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('Validation errors:', errors.array());
      return res.status(400).json({ error: errors.array()[0].msg });
    }

    const { email, password } = req.body;
    console.log('Login attempt for email:', email);

    const user = await User.findOne({ email });
    if (!user) {
      console.log('User not found for email:', email);
    }
    const passwordMatch = user ? await user.comparePassword(password) : false;
    if (!user || !passwordMatch) {
      console.log('Invalid credentials for email:', email);
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate access token
    const accessToken = jwt.sign({ id: user._id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });

    // Generate refresh token
    const refreshToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });

    // Hash refresh token and update user
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 12);
    user.refreshToken = hashedRefreshToken;
    await user.save();

    res.json({
      message: 'Login successful',
      accessToken,
      refreshToken,
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });
  } catch (err) {
    console.error('Error in login route:', err);
    res.status(500).json({ error: err.message });
  }
});

// Get current user (protected)
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-passwordHash -refreshToken');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Refresh token endpoint
router.post('/refresh', [
  body('refreshToken').notEmpty().withMessage('Refresh token is required'),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array()[0].msg });
    }

    const { refreshToken } = req.body;

    // Verify refresh token
    const decoded = await jwtVerify(refreshToken, process.env.JWT_SECRET);

    // Find user
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ error: 'Invalid refresh token' });
    }

    // Verify refresh token hash matches stored
    const isValidRefresh = await bcrypt.compare(refreshToken, user.refreshToken);
    if (!isValidRefresh) {
      return res.status(401).json({ error: 'Invalid refresh token' });
    }

    // Generate new access token
    const newAccessToken = jwt.sign({ id: user._id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });

    // Generate new refresh token
    const newRefreshToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });

    // Hash new refresh token and update user
    const hashedNewRefreshToken = await bcrypt.hash(newRefreshToken, 12);
    user.refreshToken = hashedNewRefreshToken;
    await user.save();

    res.json({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken
    });
  } catch (err) {
    if (err.name === 'TokenExpiredError' || err.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Invalid refresh token' });
    }
    console.error('Error in refresh route:', err);
    res.status(500).json({ error: err.message });
  }
});

// Get user by ID (protected)
router.get('/:id', auth, async (req, res) => {
  try {
    if (req.user.id.toString() !== req.params.id) {
      return res.status(403).json({ error: 'Access denied' });
    }
    const user = await User.findById(req.params.id).select('-passwordHash -refreshToken');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
