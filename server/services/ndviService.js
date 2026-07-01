const SatelliteData = require('../models/SatelliteData');
const District = require('../models/District');
const { checkThresholds } = require('./alertEngine');

const calculateNDVI = async (districtId) => {
  try {
    const district = await District.findById(districtId);
    if (!district) throw new Error('District not found');

    const baseNDVI = 0.3 + (Math.random() * 0.5);
    const ndviValue = Math.round(baseNDVI * 1000) / 1000;

    const baseWater = 50 + (Math.random() * 400);
    const waterExtentKm2 = Math.round(baseWater * 100) / 100;

    const satelliteData = await SatelliteData.create({
      district: districtId,
      ndviValue: ndviValue,
      waterExtentKm2: waterExtentKm2,
      cloudCoverage: Math.round(Math.random() * 30 * 100) / 100,
      source: 'Sentinel-2',
      timestamp: new Date()
    });

    district.lastNDVI = ndviValue;
    district.lastWaterExtent = waterExtentKm2;
    await district.save();

    await checkThresholds(districtId, ndviValue, waterExtentKm2);

    return satelliteData;
  } catch (error) {
    console.error('NDVI calculation error:', error);
    throw error;
  }
};

const calculateAllNDVI = async () => {
  try {
    const districts = await District.find();
    const results = [];
    for (const district of districts) {
      const result = await calculateNDVI(district._id);
      results.push(result);
    }
    return results;
  } catch (error) {
    console.error('NDVI calculation error:', error);
    throw error;
  }
};

module.exports = { calculateNDVI, calculateAllNDVI };