const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const errorHandler = require('./middleware/errorHandler');
const mongoose = require('mongoose');

const alertsRouter = require('./routes/alerts');
const districtsRouter = require('./routes/districts');
const ndviRouter = require('./routes/ndvi');
const uploadsRouter = require('./routes/uploads');
const pipelineRouter = require('./routes/pipeline');
const authRouter = require('./routes/auth');

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(morgan('dev'));

app.get('/health', (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
  res.json({
    success: true,
    message: 'GeoSentinel API is running',
    database: dbStatus,
    timestamp: new Date().toISOString()
  });
});

app.use('/api/auth', authRouter);
app.use('/api/alerts', alertsRouter);
app.use('/api/districts', districtsRouter);
app.use('/api/ndvi', ndviRouter);
app.use('/api/uploads', uploadsRouter);
app.use('/api/pipeline', pipelineRouter);

app.use(errorHandler);

app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

module.exports = app;