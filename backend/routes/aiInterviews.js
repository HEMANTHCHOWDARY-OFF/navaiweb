const express = require('express');
const AIInterview = require('../models/AIInterview');
const router = express.Router();

// Create interview
router.post('/', async (req, res) => {
  try {
    const interview = new AIInterview(req.body);
    await interview.save();
    res.status(201).json(interview);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all interviews for a user
router.get('/user/:userId', async (req, res) => {
  try {
    const interviews = await AIInterview.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.json(interviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get recent interviews for a user (limit 5)
router.get('/user/:userId/recent', async (req, res) => {
  try {
    const interviews = await AIInterview.find({ userId: req.params.userId }).sort({ createdAt: -1 }).limit(5);
    res.json(interviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get interview by ID
router.get('/:id', async (req, res) => {
  try {
    const interview = await AIInterview.findById(req.params.id);
    if (!interview) return res.status(404).json({ error: 'Interview not found' });
    res.json(interview);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
