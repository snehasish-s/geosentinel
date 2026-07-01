const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'geosentinel_jwt_secret_key_2026', { expiresIn: '30d' });
};

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (global.mockDB) {
    res.status(201).json({
      success: true,
      data: {
        _id: 'mock-user-1',
        name: name || 'User',
        email,
        token: generateToken('mock-user-1')
      }
    });
    return;
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400).json({ success: false, message: 'User already exists' });
    return;
  }

  const user = await User.create({ name, email, password });
  
  res.status(201).json({
    success: true,
    data: {
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    }
  });
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  console.log('Login attempt:', email, 'mockDB:', !!global.mockDB);

  if (global.mockDB) {
    console.log('Using mock DB login');
    if (email === 'admin@geosentinel.com' && password === 'GeoSentinel@2026') {
      res.json({
        success: true,
        data: {
          _id: 'mock-admin-1',
          name: 'Admin User',
          email: 'admin@geosentinel.com',
          token: generateToken('mock-admin-1')
        }
      });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
    return;
  }

  console.log('Using MongoDB login');
  const user = await User.findOne({ email });
  
  if (user && (await user.matchPassword(password))) {
    res.json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id)
      }
    });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

const getMe = asyncHandler(async (req, res) => {
  if (global.mockDB) {
    res.json({ success: true, data: { _id: 'mock-admin-1', name: 'Admin User', email: 'admin@geosentinel.com' } });
    return;
  }

  const user = await User.findById(req.user._id).select('-password');
  res.json({ success: true, data: user });
});

module.exports = { registerUser, loginUser, getMe };