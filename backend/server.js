const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

console.log('JWT_SECRET:', process.env.JWT_SECRET);

if (!process.env.JWT_SECRET) {
  throw new Error("❌ JWT_SECRET is not defined in .env file");
}

console.log('Loaded env vars starting with MONGO:', Object.keys(process.env).filter(k => k.startsWith('MONGO')));

const app = express();

// Middleware
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

const upload = multer({ dest: 'uploads/' });

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/navai', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  retryWrites: true,
  w: 'majority'
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/resumes', require('./routes/resumes'));
app.use('/api/resumeScreenings', require('./routes/resumeScreenings'));
app.use('/api/aiInterviews', require('./routes/aiInterviews'));
app.use('/api/generatedQuestions', require('./routes/generatedQuestions'));

// Global error handler
app.use((err, req, res, next) => {
  console.error('Global error handler:', err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('Connected to MongoDB for user storage');
});
