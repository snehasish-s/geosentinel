const SatelliteData = require('../models/SatelliteData');
const District = require('../models/District');
const asyncHandler = require('express-async-handler');
const { calculateNDVI, calculateAllNDVI } = require('../services/ndviService');

const getLatestNDVI = asyncHandler(async (req, res) => {
  const districts = await District.find({});
  
  const latestData = [];
  for (const district of districts) {
    const latest = await SatelliteData.findOne({ district: district._id })
      .sort({ timestamp: -1 });
    if (latest) {
      latestData.push({
        district: district.name,
        districtId: district._id,
        ndviValue: latest.ndviValue,
        waterExtentKm2: latest.waterExtentKm2,
        timestamp: latest.timestamp
      });
    }
  }

  res.json({ success: true, data: latestData });
});

const getNDVIHistory = asyncHandler(async (req, res) => {
  const { districtId } = req.params;
  const { days = 30 } = req.query;
  
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - parseInt(days));

  const data = await SatelliteData.find({
    district: districtId,
    timestamp: { $gte: startDate }
  }).sort({ timestamp: 1 });

  res.json({ success: true, data });
});

const calculateNewNDVI = asyncHandler(async (req, res) => {
  const { districtId } = req.body;
  
  let result;
  if (districtId) {
    result = await calculateNDVI(districtId);
  } else {
    result = await calculateAllNDVI();
  }

  res.json({ success: true, data: result });
});

module.exports = {
  getLatestNDVI,
  getNDVIHistory,
  calculateNewNDVI
};