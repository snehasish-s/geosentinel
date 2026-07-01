const mongoose = require('mongoose');

const districtSchema = new mongoose.Schema({
  name: { type: String, required: true },
  state: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  riskLevel: { type: String, enum: ['Low', 'Medium', 'High', 'Critical'], default: 'Low' },
  coordinates: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  population: { type: Number },
  area: { type: Number },
  lastNDVI: { type: Number, default: 0.5 },
  lastWaterExtent: { type: Number, default: 0 },
  activeAlerts: { type: Number, default: 0 }
});

module.exports = mongoose.model('District', districtSchema);