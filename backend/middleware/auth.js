// const jwt = require('jsonwebtoken');
// const User = require('../models/User');
// const ensureAuthenticated = require('./middleware/auth'); // path adjust karo agar alag hai

// const auth = async (req, res, next) => {
//   try {
//     const token = req.header('Authorization')?.replace('Bearer ', '');
    
//     if (!token) {
//       return res.status(401).json({ 
//         success: false, 
//         message: 'Access denied. No token provided.' 
//       });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await User.findById(decoded.userId).select('-password');
    
//     if (!user) {
//       return res.status(401).json({ 
//         success: false, 
//         message: 'Invalid token. User not found.' 
//       });
//     }

//     req.user = user;
//     next();
//   } catch (error) {
//     if (error.name === 'JsonWebTokenError') {
//       return res.status(401).json({ 
//         success: false, 
//         message: 'Invalid token.' 
//       });
//     }
    
//     if (error.name === 'TokenExpiredError') {
//       return res.status(401).json({ 
//         success: false, 
//         message: 'Token expired.' 
//       });
//     }

//     console.error('Auth middleware error:', error);
//     res.status(500).json({ 
//       success: false, 
//       message: 'Server error during authentication.' 
//     });
//   }
// };

// module.exports = auth;
// backend/middleware/auth.js
const jwt = require('jsonwebtoken');

const ensureAuthenticated = (req, res, next) => {
  // Accept Authorization header in format: "Bearer <token>"
  const authHeader = req.headers['authorization'] || req.headers['Authorization'];
  if (!authHeader) {
    return res.status(401).json({ success: false, message: 'No token provided' });
  }

  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({ success: false, message: 'Token format is invalid' });
  }

  const token = parts[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // store decoded payload on req.user (adjust if your token uses different key e.g. decoded.id)
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
};

module.exports = ensureAuthenticated;

