// backend/server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const ensureAuthenticated = require('./middleware/auth');
const User = require('./models/User');

// Load environment variables
dotenv.config();

// Connect to DB
connectDB();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? ['https://your-frontend-domain.com']
    : [/http:\/\/localhost:\d+/],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request Logger Middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// Routes
app.use('/api/auth', require('./routes/auth'));

// Health check route
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'HealthCare Pro API is running',
    timestamp: new Date().toISOString()
  });
});

// Protected route: return full user document (without password)
// NOTE: This must be BEFORE the 404 handler
app.get('/api/user/me', ensureAuthenticated, async (req, res) => {
  try {
    // DEBUG: if you need to see what's inside the decoded token, uncomment:
    // console.log('decoded jwt payload:', req.user);

    // Support multiple possible key names in token payload
    const userId = req.user.userId || req.user.id || req.user._id;

    if (!userId) {
      return res.status(400).json({ success: false, message: 'Invalid token payload' });
    }

    const user = await User.findById(userId).select('-password');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    return res.json({ success: true, user });
  } catch (err) {
    console.error('Error in /api/user/me:', err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

// 404 handler — keep AFTER all routes
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error'
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 HealthCare Pro API server running on port ${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/api/health`);
});
