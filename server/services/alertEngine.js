const Alert = require('../models/Alert');
const District = require('../models/District');

const checkThresholds = async (districtId, ndviValue, waterExtentKm2) => {
  try {
    const district = await District.findById(districtId);
    if (!district) return;

    let alertTriggered = false;
    let alertType = null;
    let severity = 'Low';
    let message = '';

    if (ndviValue < 0.3) {
      alertTriggered = true;
      alertType = 'Drought';
      if (ndviValue < 0.15) severity = 'Critical';
      else if (ndviValue < 0.2) severity = 'High';
      else severity = 'Medium';
      message = `Low vegetation health detected. NDVI: ${ndviValue.toFixed(3)}`;
    }

    if (waterExtentKm2 > 300) {
      alertTriggered = true;
      alertType = 'Flood';
      if (waterExtentKm2 > 450) severity = 'Critical';
      else if (waterExtentKm2 > 380) severity = 'High';
      else severity = 'Medium';
      message = `High water body extent detected. Area: ${waterExtentKm2.toFixed(2)} km²`;
    }

    if (alertTriggered && alertType) {
      const existingAlert = await Alert.findOne({
        district: district.name,
        status: 'Active',
        alertType: alertType
      });

      if (!existingAlert) {
        const newAlert = await Alert.create({
          district: district.name,
          state: district.state,
          alertType: alertType,
          severity: severity,
          ndviValue: ndviValue,
          waterExtentKm2: waterExtentKm2,
          message: message,
          status: 'Active',
          coordinates: district.coordinates
        });

        district.activeAlerts += 1;
        if (severity === 'Critical' || district.riskLevel === 'Critical') {
          district.riskLevel = severity;
        } else if (severity === 'High' && district.riskLevel !== 'Critical') {
          district.riskLevel = 'High';
        }
        await district.save();

        return newAlert;
      }
    }

    return null;
  } catch (error) {
    console.error('Alert engine error:', error);
  }
};

module.exports = { checkThresholds };