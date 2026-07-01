const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
  district: { type: String, required: true },
  state: { type: String, required: true },
  alertType: { type: String, enum: ['Flood', 'Drought', 'Fire'], required: true },
  severity: { type: String, enum: ['Low', 'Medium', 'High', 'Critical'], required: true },
  ndviValue: { type: Number },
  waterExtentKm2: { type: Number },
  message: { type: String },
  status: { type: String, enum: ['Active', 'Resolved'], default: 'Active' },
  triggeredAt: { type: Date, default: Date.now },
  resolvedAt: { type: Date },
  coordinates: {
    lat: { type: Number },
    lng: { type: Number }
  }
});

module.exports = mongoose.model('Alert', alertSchema);