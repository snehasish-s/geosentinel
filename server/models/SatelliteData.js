const mongoose = require('mongoose');

const satelliteDataSchema = new mongoose.Schema({
  district: { type: mongoose.Schema.Types.ObjectId, ref: 'District' },
  timestamp: { type: Date, default: Date.now },
  ndviValue: { type: Number, required: true, min: 0, max: 1 },
  waterExtentKm2: { type: Number, required: true },
  cloudCoverage: { type: Number, default: 0 },
  source: { type: String, default: 'Sentinel-2' },
  rawFileUrl: { type: String }
});

module.exports = mongoose.model('SatelliteData', satelliteDataSchema);