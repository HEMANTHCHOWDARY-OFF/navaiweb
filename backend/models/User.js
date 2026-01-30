const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  refreshToken: {
    type: String,
    default: null
  },
  role: {
    type: String,
    enum: ['Job Seeker', 'Admin'],
    default: 'Job Seeker'
  },
  profilePicUrl: {
    type: String,
    default: null
  }
}, {
  timestamps: true
});

// Index for fast queries
// userSchema.index({ email: 1 }); // Removed as unique: true creates it

// Pre-save hook to hash password
userSchema.pre('save', async function(next) {
  if (!this.isModified('passwordHash')) return next();
  const salt = await bcrypt.genSalt(12);
  this.passwordHash = await bcrypt.hash(this.passwordHash, salt);
  next();
});

// Method to compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.passwordHash);
};

module.exports = mongoose.model('User', userSchema);
