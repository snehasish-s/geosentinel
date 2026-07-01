const mongoose = require('mongoose');

const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/geosentinel';
  
  try {
    if (mongoUri.includes('mongodb+srv://')) {
      console.log('Attempting MongoDB Atlas connection...');
      const conn = await mongoose.connect(mongoUri, {
        serverSelectionTimeoutMS: 3000,
      });
      console.log(`MongoDB Connected: ${conn.connection.host}`);
      return conn;
    }
    
    throw new Error('Using local MongoDB or mock mode');
  } catch (error) {
    console.log('MongoDB not available. Using in-memory mock database.');
    
    const mockData = {
      alerts: [
        { _id: '1', district: 'Tinsukia', state: 'Assam', alertType: 'Flood', severity: 'Critical', status: 'Active', message: 'Severe flooding', triggeredAt: new Date(), coordinates: { lat: 26.1206, lng: 85.3647 } },
        { _id: '2', district: 'Dimapur', state: 'Nagaland', alertType: 'Landslide', severity: 'High', status: 'Active', message: 'Heavy rainfall', triggeredAt: new Date(), coordinates: { lat: 25.9124, lng: 93.7362 } },
        { _id: '3', district: 'Churachandpur', state: 'Manipur', alertType: 'Flood', severity: 'High', status: 'Active', message: 'River rising', triggeredAt: new Date(), coordinates: { lat: 24.3333, lng: 93.7333 } },
        { _id: '4', district: 'Agartala', state: 'Tripura', alertType: 'Flood', severity: 'Critical', status: 'Active', message: 'Flash floods', triggeredAt: new Date(), coordinates: { lat: 23.8294, lng: 91.2803 } },
        { _id: '5', district: 'Dibrugarh', state: 'Assam', alertType: 'Erosion', severity: 'High', status: 'Active', message: 'Riverbank erosion', triggeredAt: new Date(), coordinates: { lat: 26.1543, lng: 85.8938 } },
        { _id: '6', district: 'Lower Subansiri', state: 'Arunachal Pradesh', alertType: 'Landslide', severity: 'Medium', status: 'Active', message: 'Highway landslides', triggeredAt: new Date(), coordinates: { lat: 27.5488, lng: 93.3737 } },
        { _id: '7', district: 'Kamrup', state: 'Assam', alertType: 'Drought', severity: 'Low', status: 'Resolved', message: 'Water shortage', triggeredAt: new Date(Date.now() - 24 * 60 * 60 * 1000), resolvedAt: new Date(), coordinates: { lat: 26.3521, lng: 86.0710 } },
        { _id: '8', district: 'Papum Pare', state: 'Arunachal Pradesh', alertType: 'Forest Fire', severity: 'Medium', status: 'Resolved', message: 'Forest fire', triggeredAt: new Date(Date.now() - 48 * 60 * 60 * 1000), resolvedAt: new Date(), coordinates: { lat: 27.1023, lng: 93.6891 } },
      ],
      districts: [
        { _id: '1', name: 'Kamrup', state: 'Assam', riskLevel: 'Medium', lastNDVI: 0.65, lastWaterExtent: 120, activeAlerts: 2 },
        { _id: '2', name: 'Dibrugarh', state: 'Assam', riskLevel: 'High', lastNDVI: 0.45, lastWaterExtent: 280, activeAlerts: 5 },
        { _id: '3', name: 'Tinsukia', state: 'Assam', riskLevel: 'Critical', lastNDVI: 0.35, lastWaterExtent: 450, activeAlerts: 8 },
        { _id: '4', name: 'Sivasagar', state: 'Assam', riskLevel: 'Low', lastNDVI: 0.72, lastWaterExtent: 80, activeAlerts: 0 },
        { _id: '5', name: 'Jorhat', state: 'Assam', riskLevel: 'Medium', lastNDVI: 0.58, lastWaterExtent: 150, activeAlerts: 1 },
        { _id: '6', name: 'Dimapur', state: 'Nagaland', riskLevel: 'High', lastNDVI: 0.52, lastWaterExtent: 95, activeAlerts: 3 },
        { _id: '7', name: 'Kohima', state: 'Nagaland', riskLevel: 'Medium', lastNDVI: 0.61, lastWaterExtent: 70, activeAlerts: 1 },
        { _id: '8', name: 'Mokokchung', state: 'Nagaland', riskLevel: 'Low', lastNDVI: 0.68, lastWaterExtent: 45, activeAlerts: 0 },
        { _id: '9', name: 'Imphal East', state: 'Manipur', riskLevel: 'Medium', lastNDVI: 0.55, lastWaterExtent: 110, activeAlerts: 2 },
        { _id: '10', name: 'Imphal West', state: 'Manipur', riskLevel: 'Low', lastNDVI: 0.62, lastWaterExtent: 85, activeAlerts: 0 },
        { _id: '11', name: 'Churachandpur', state: 'Manipur', riskLevel: 'High', lastNDVI: 0.48, lastWaterExtent: 180, activeAlerts: 4 },
        { _id: '12', name: 'Shillong', state: 'Meghalaya', riskLevel: 'Low', lastNDVI: 0.71, lastWaterExtent: 55, activeAlerts: 0 },
        { _id: '13', name: 'Tura', state: 'Meghalaya', riskLevel: 'Medium', lastNDVI: 0.58, lastWaterExtent: 90, activeAlerts: 1 },
        { _id: '14', name: 'Aizawl', state: 'Mizoram', riskLevel: 'Low', lastNDVI: 0.75, lastWaterExtent: 35, activeAlerts: 0 },
        { _id: '15', name: 'Lunglei', state: 'Mizoram', riskLevel: 'Medium', lastNDVI: 0.63, lastWaterExtent: 65, activeAlerts: 1 },
        { _id: '16', name: 'Agartala', state: 'Tripura', riskLevel: 'High', lastNDVI: 0.47, lastWaterExtent: 200, activeAlerts: 5 },
        { _id: '17', name: 'Dhalai', state: 'Tripura', riskLevel: 'Medium', lastNDVI: 0.54, lastWaterExtent: 130, activeAlerts: 2 },
        { _id: '18', name: 'Papum Pare', state: 'Arunachal Pradesh', riskLevel: 'Low', lastNDVI: 0.69, lastWaterExtent: 75, activeAlerts: 1 },
        { _id: '19', name: 'East Kameng', state: 'Arunachal Pradesh', riskLevel: 'Medium', lastNDVI: 0.56, lastWaterExtent: 95, activeAlerts: 0 },
        { _id: '20', name: 'Lower Subansiri', state: 'Arunachal Pradesh', riskLevel: 'High', lastNDVI: 0.42, lastWaterExtent: 220, activeAlerts: 3 },
      ],
      ndviData: [
        { _id: '1', district: 'Kamrup', ndviValue: 0.65, waterExtentKm2: 120, timestamp: new Date() },
        { _id: '2', district: 'Dibrugarh', ndviValue: 0.45, waterExtentKm2: 280, timestamp: new Date() },
        { _id: '3', district: 'Tinsukia', ndviValue: 0.35, waterExtentKm2: 450, timestamp: new Date() },
        { _id: '4', district: 'Sivasagar', ndviValue: 0.72, waterExtentKm2: 80, timestamp: new Date() },
        { _id: '5', district: 'Jorhat', ndviValue: 0.58, waterExtentKm2: 150, timestamp: new Date() },
        { _id: '6', district: 'Dimapur', ndviValue: 0.52, waterExtentKm2: 95, timestamp: new Date() },
        { _id: '7', district: 'Kohima', ndviValue: 0.61, waterExtentKm2: 70, timestamp: new Date() },
        { _id: '8', district: 'Mokokchung', ndviValue: 0.68, waterExtentKm2: 45, timestamp: new Date() },
        { _id: '9', district: 'Imphal East', ndviValue: 0.55, waterExtentKm2: 110, timestamp: new Date() },
        { _id: '10', district: 'Imphal West', ndviValue: 0.62, waterExtentKm2: 85, timestamp: new Date() },
      ],
      pipeline: { status: 'Idle', lastRun: new Date() }
    };
    
    global.mockDB = mockData;
    console.log('Mock database initialized with mock data');
    return null;
  }
};

module.exports = connectDB;