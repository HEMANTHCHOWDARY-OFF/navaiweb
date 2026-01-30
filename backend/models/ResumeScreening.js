const mongoose = require('mongoose');

const resumeScreeningSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  resumeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Resume'
  },
  atsScore: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  keywords: [{
    type: String
  }],
  overallScore: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  feedback: [{
    type: String
  }]
}, {
  timestamps: true
});

// Indexes for fast queries
resumeScreeningSchema.index({ userId: 1, createdAt: -1 });

module.exports = mongoose.model('ResumeScreening', resumeScreeningSchema);
