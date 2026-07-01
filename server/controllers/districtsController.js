const District = require('../models/District');
const SatelliteData = require('../models/SatelliteData');
const Alert = require('../models/Alert');
const asyncHandler = require('express-async-handler');
const mockData = require('../utils/mockData');

const getDistricts = asyncHandler(async (req, res) => {
  if (global.mockDB) {
    res.json({ success: true, data: mockData.districts });
    return;
  }
  const districts = await District.find({});
  res.json({ success: true, data: districts });
});

const getDistrictById = asyncHandler(async (req, res) => {
  if (global.mockDB) {
    const district = mockData.districts.find(d => d._id === req.params.id);
    if (!district) {
      res.status(404).json({ success: false, message: 'District not found' });
      return;
    }
    res.json({ success: true, data: district });
    return;
  }

  const district = await District.findById(req.params.id);
  if (!district) {
    res.status(404).json({ success: false, message: 'District not found' });
    return;
  }
  res.json({ success: true, data: district });
});

const getDistrictHistory = asyncHandler(async (req, res) => {
  if (global.mockDB) {
    res.json({ success: true, data: [] });
    return;
  }

  const { id } = req.params;
  const { days = 30 } = req.query;
  
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - parseInt(days));

  const data = await SatelliteData.find({
    district: id,
    timestamp: { $gte: startDate }
  }).sort({ timestamp: 1 });

  res.json({ success: true, data });
});

const getDistrictsSummary = asyncHandler(async (req, res) => {
  if (global.mockDB) {
    const summary = mockData.districts.map(d => ({
      ...d,
      activeAlerts: mockData.alerts.filter(a => a.district === d.name && a.status === 'Active').length
    }));
    res.json({ success: true, data: summary });
    return;
  }

  const districts = await District.find({});
  const alerts = await Alert.find({ status: 'Active' });
  
  const summary = districts.map(d => {
    const districtAlerts = alerts.filter(a => a.district === d.name);
    return {
      ...d.toObject(),
      activeAlerts: districtAlerts.length
    };
  });

  res.json({ success: true, data: summary });
});

module.exports = {
  getDistricts,
  getDistrictById,
  getDistrictHistory,
  getDistrictsSummary
};