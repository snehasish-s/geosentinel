const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('../models/User');
const District = require('../models/District');
const SatelliteData = require('../models/SatelliteData');
const Alert = require('../models/Alert');

const districts = [
  { name: 'Madhubani', state: 'Bihar', code: 'BR001', coordinates: { lat: 26.3521, lng: 86.0710 }, population: 4486379, area: 3501 },
  { name: 'Darbhanga', state: 'Bihar', code: 'BR002', coordinates: { lat: 26.1543, lng: 85.8938 }, population: 3921978, area: 2279 },
  { name: 'Muzaffarpur', state: 'Bihar', code: 'BR003', coordinates: { lat: 26.1206, lng: 85.3647 }, population: 4802377, area: 3172 },
  { name: 'Gopalganj', state: 'Bihar', code: 'BR004', coordinates: { lat: 26.4658, lng: 84.4346 }, population: 2564632, area: 2033 },
  { name: 'Sitamarhi', state: 'Bihar', code: 'BR005', coordinates: { lat: 26.5896, lng: 85.4923 }, population: 3429954, area: 2294 },
  { name: 'Sheohar', state: 'Bihar', code: 'BR006', coordinates: { lat: 26.9267, lng: 85.2867 }, population: 656246, area: 689 },
  { name: 'East Champaran', state: 'Bihar', code: 'BR007', coordinates: { lat: 26.6563, lng: 84.9431 }, population: 5087377, area: 3968 },
  { name: 'West Champaran', state: 'Bihar', code: 'BR008', coordinates: { lat: 27.1065, lng: 84.1903 }, population: 3935056, area: 5228 },
  { name: 'Gaya', state: 'Bihar', code: 'BR009', coordinates: { lat: 24.7462, lng: 84.9910 }, population: 4391418, area: 4971 },
  { name: 'Katihar', state: 'Bihar', code: 'BR010', coordinates: { lat: 25.5396, lng: 87.5836 }, population: 3071021, area: 3057 },
  { name: 'Saharsa', state: 'Bihar', code: 'BR011', coordinates: { lat: 25.8800, lng: 86.5945 }, population: 1905608, area: 1687 },
  { name: 'Supaul', state: 'Bihar', code: 'BR012', coordinates: { lat: 26.1149, lng: 86.5934 }, population: 2221841, area: 2425 },
  { name: 'Madhepura', state: 'Bihar', code: 'BR013', coordinates: { lat: 25.9219, lng: 86.7914 }, population: 1994676, area: 1787 },
  { name: 'Bhagalpur', state: 'Bihar', code: 'BR014', coordinates: { lat: 25.0694, lng: 86.9194 }, population: 3037766, area: 2570 },
  { name: 'Khagaria', state: 'Bihar', code: 'BR015', coordinates: { lat: 25.3500, lng: 86.4806 }, population: 1666885, area: 1486 },
  { name: 'Dhanbad', state: 'Jharkhand', code: 'JH001', coordinates: { lat: 23.7957, lng: 86.4304 }, population: 2682662, area: 2040 },
  { name: 'Ranchi', state: 'Jharkhand', code: 'JH002', coordinates: { lat: 23.3441, lng: 85.3095 }, population: 2917853, area: 3847 },
  { name: 'Hazaribagh', state: 'Jharkhand', code: 'JH003', coordinates: { lat: 23.9928, lng: 85.3644 }, population: 1734045, area: 3555 },
  { name: 'Palamu', state: 'Jharkhand', code: 'JH004', coordinates: { lat: 24.0326, lng: 84.0719 }, population: 1936869, area: 4395 },
  { name: 'Dumka', state: 'Jharkhand', code: 'JH005', coordinates: { lat: 24.2660, lng: 87.2495 }, population: 1321352, area: 4103 }
];

const alertTypes = ['Flood', 'Drought', 'Fire'];
const severities = ['Low', 'Medium', 'High', 'Critical'];
const statuses = ['Active', 'Resolved'];

const randomDate = (start, end) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected for seeding...');

    await User.deleteMany({});
    await District.deleteMany({});
    await SatelliteData.deleteMany({});
    await Alert.deleteMany({});
    console.log('Cleared existing data');

    const hashedPassword = await bcrypt.hash('GeoSentinel@2026', 10);
    await User.create({
      name: 'Admin User',
      email: 'admin@geosentinel.com',
      password: hashedPassword,
      role: 'admin'
    });
    console.log('Created admin user: admin@geosentinel.com / GeoSentinel@2026');

    const createdDistricts = await District.insertMany(
      districts.map(d => ({
        ...d,
        riskLevel: 'Low',
        lastNDVI: 0.5,
        lastWaterExtent: 100,
        activeAlerts: 0
      }))
    );
    console.log(`Created ${createdDistricts.length} districts`);

    const satelliteDataRecords = [];
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    for (const district of createdDistricts) {
      for (let i = 0; i < 10; i++) {
        const timestamp = randomDate(thirtyDaysAgo, now);
        satelliteDataRecords.push({
          district: district._id,
          timestamp: timestamp,
          ndviValue: Math.round((0.1 + Math.random() * 0.8) * 1000) / 1000,
          waterExtentKm2: Math.round((10 + Math.random() * 490) * 100) / 100,
          cloudCoverage: Math.round(Math.random() * 30 * 100) / 100,
          source: 'Sentinel-2'
        });
      }
    }

    await SatelliteData.insertMany(satelliteDataRecords);
    console.log(`Created ${satelliteDataRecords.length} satellite data records`);

    const alertRecords = [];
    for (let i = 0; i < 50; i++) {
      const district = createdDistricts[Math.floor(Math.random() * createdDistricts.length)];
      const alertType = alertTypes[Math.floor(Math.random() * alertTypes.length)];
      const severity = severities[Math.floor(Math.random() * severities.length)];
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      const triggeredAt = randomDate(thirtyDaysAgo, now);

      alertRecords.push({
        district: district.name,
        state: district.state,
        alertType: alertType,
        severity: severity,
        ndviValue: alertType === 'Drought' ? Math.round((0.1 + Math.random() * 0.2) * 1000) / 1000 : null,
        waterExtentKm2: alertType === 'Flood' ? Math.round((300 + Math.random() * 200) * 100) / 100 : null,
        message: `${alertType} alert for ${district.name}`,
        status: status,
        triggeredAt: triggeredAt,
        resolvedAt: status === 'Resolved' ? new Date(triggeredAt.getTime() + Math.random() * 24 * 60 * 60 * 1000) : null,
        coordinates: district.coordinates
      });
    }

    await Alert.insertMany(alertRecords);
    console.log(`Created ${alertRecords.length} alerts`);

    console.log('Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedData();