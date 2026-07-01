const districts = [
  { _id: '1', name: 'Kamrup', state: 'Assam', code: 'AS001', coordinates: { lat: 26.3521, lng: 86.0710 }, population: 4486379, area: 3501, riskLevel: 'Medium', lastNDVI: 0.65, lastWaterExtent: 120, activeAlerts: 2 },
  { _id: '2', name: 'Dibrugarh', state: 'Assam', code: 'AS002', coordinates: { lat: 26.1543, lng: 85.8938 }, population: 3921978, area: 2279, riskLevel: 'High', lastNDVI: 0.45, lastWaterExtent: 280, activeAlerts: 5 },
  { _id: '3', name: 'Tinsukia', state: 'Assam', code: 'AS003', coordinates: { lat: 26.1206, lng: 85.3647 }, population: 4802377, area: 3172, riskLevel: 'Critical', lastNDVI: 0.35, lastWaterExtent: 450, activeAlerts: 8 },
  { _id: '4', name: 'Sivasagar', state: 'Assam', code: 'AS004', coordinates: { lat: 26.4658, lng: 84.4346 }, population: 2564632, area: 2033, riskLevel: 'Low', lastNDVI: 0.72, lastWaterExtent: 80, activeAlerts: 0 },
  { _id: '5', name: 'Jorhat', state: 'Assam', code: 'AS005', coordinates: { lat: 26.5896, lng: 85.4923 }, population: 3429954, area: 2294, riskLevel: 'Medium', lastNDVI: 0.58, lastWaterExtent: 150, activeAlerts: 1 },
  { _id: '6', name: 'Dimapur', state: 'Nagaland', code: 'NL001', coordinates: { lat: 25.9124, lng: 93.7362 }, population: 378811, area: 512, riskLevel: 'High', lastNDVI: 0.52, lastWaterExtent: 95, activeAlerts: 3 },
  { _id: '7', name: 'Kohima', state: 'Nagaland', code: 'NL002', coordinates: { lat: 25.6749, lng: 94.1089 }, population: 267988, area: 1597, riskLevel: 'Medium', lastNDVI: 0.61, lastWaterExtent: 70, activeAlerts: 1 },
  { _id: '8', name: 'Mokokchung', state: 'Nagaland', code: 'NL003', coordinates: { lat: 26.5911, lng: 94.5158 }, population: 194522, area: 1248, riskLevel: 'Low', lastNDVI: 0.68, lastWaterExtent: 45, activeAlerts: 0 },
  { _id: '9', name: 'Imphal East', state: 'Manipur', code: 'MN001', coordinates: { lat: 24.8171, lng: 93.9588 }, population: 456125, area: 965, riskLevel: 'Medium', lastNDVI: 0.55, lastWaterExtent: 110, activeAlerts: 2 },
  { _id: '10', name: 'Imphal West', state: 'Manipur', code: 'MN002', coordinates: { lat: 24.7551, lng: 93.9004 }, population: 517255, area: 844, riskLevel: 'Low', lastNDVI: 0.62, lastWaterExtent: 85, activeAlerts: 0 },
  { _id: '11', name: 'Churachandpur', state: 'Manipur', code: 'MN003', coordinates: { lat: 24.3333, lng: 93.7333 }, population: 274486, area: 4570, riskLevel: 'High', lastNDVI: 0.48, lastWaterExtent: 180, activeAlerts: 4 },
  { _id: '12', name: 'Shillong', state: 'Meghalaya', code: 'MG001', coordinates: { lat: 25.5788, lng: 91.8933 }, population: 354325, area: 6430, riskLevel: 'Low', lastNDVI: 0.71, lastWaterExtent: 55, activeAlerts: 0 },
  { _id: '13', name: 'Tura', state: 'Meghalaya', code: 'MG002', coordinates: { lat: 25.5207, lng: 90.2202 }, population: 295032, area: 3712, riskLevel: 'Medium', lastNDVI: 0.58, lastWaterExtent: 90, activeAlerts: 1 },
  { _id: '14', name: 'Aizawl', state: 'Mizoram', code: 'MZ001', coordinates: { lat: 23.7271, lng: 92.7176 }, population: 400000, area: 3572, riskLevel: 'Low', lastNDVI: 0.75, lastWaterExtent: 35, activeAlerts: 0 },
  { _id: '15', name: 'Lunglei', state: 'Mizoram', code: 'MZ002', coordinates: { lat: 22.8929, lng: 92.7464 }, population: 161425, area: 4538, riskLevel: 'Medium', lastNDVI: 0.63, lastWaterExtent: 65, activeAlerts: 1 },
  { _id: '16', name: 'Agartala', state: 'Tripura', code: 'TR001', coordinates: { lat: 23.8294, lng: 91.2803 }, population: 522613, area: 1523, riskLevel: 'High', lastNDVI: 0.47, lastWaterExtent: 200, activeAlerts: 5 },
  { _id: '17', name: 'Dhalai', state: 'Tripura', code: 'TR002', coordinates: { lat: 24.3211, lng: 91.9456 }, population: 349996, area: 2400, riskLevel: 'Medium', lastNDVI: 0.54, lastWaterExtent: 130, activeAlerts: 2 },
  { _id: '18', name: 'Papum Pare', state: 'Arunachal Pradesh', code: 'AP001', coordinates: { lat: 27.1023, lng: 93.6891 }, population: 176385, area: 2875, riskLevel: 'Low', lastNDVI: 0.69, lastWaterExtent: 75, activeAlerts: 1 },
  { _id: '19', name: 'East Kameng', state: 'Arunachal Pradesh', code: 'AP002', coordinates: { lat: 27.5514, lng: 93.2043 }, population: 78400, area: 4134, riskLevel: 'Medium', lastNDVI: 0.56, lastWaterExtent: 95, activeAlerts: 0 },
  { _id: '20', name: 'Lower Subansiri', state: 'Arunachal Pradesh', code: 'AP003', coordinates: { lat: 27.5488, lng: 93.3737 }, population: 83000, area: 3500, riskLevel: 'High', lastNDVI: 0.42, lastWaterExtent: 220, activeAlerts: 3 },
];

const alerts = [
  { _id: '1', district: 'Tinsukia', state: 'Assam', alertType: 'Flood', severity: 'Critical', status: 'Active', message: 'Severe flooding in Brahmaputra tributaries', triggeredAt: new Date(Date.now() - 2 * 60 * 60 * 1000), coordinates: { lat: 26.1206, lng: 85.3647 } },
  { _id: '2', district: 'Dimapur', state: 'Nagaland', alertType: 'Landslide', severity: 'High', status: 'Active', message: 'Heavy rainfall causing landslide risk', triggeredAt: new Date(Date.now() - 4 * 60 * 60 * 1000), coordinates: { lat: 25.9124, lng: 93.7362 } },
  { _id: '3', district: 'Churachandpur', state: 'Manipur', alertType: 'Flood', severity: 'High', status: 'Active', message: 'River water levels rising dangerously', triggeredAt: new Date(Date.now() - 5 * 60 * 60 * 1000), coordinates: { lat: 24.3333, lng: 93.7333 } },
  { _id: '4', district: 'Agartala', state: 'Tripura', alertType: 'Flood', severity: 'Critical', status: 'Active', message: 'Heavy monsoon causing flash floods', triggeredAt: new Date(Date.now() - 6 * 60 * 60 * 1000), coordinates: { lat: 23.8294, lng: 91.2803 } },
  { _id: '5', district: 'Dibrugarh', state: 'Assam', alertType: 'Erosion', severity: 'High', status: 'Active', message: 'Riverbank erosion threatening villages', triggeredAt: new Date(Date.now() - 8 * 60 * 60 * 1000), coordinates: { lat: 26.1543, lng: 85.8938 } },
  { _id: '6', district: 'Lower Subansiri', state: 'Arunachal Pradesh', alertType: 'Landslide', severity: 'Medium', status: 'Active', message: 'Multiple landslides on highway', triggeredAt: new Date(Date.now() - 10 * 60 * 60 * 1000), coordinates: { lat: 27.5488, lng: 93.3737 } },
  { _id: '7', district: 'Kamrup', state: 'Assam', alertType: 'Drought', severity: 'Low', status: 'Resolved', message: 'Water shortage in rural areas', triggeredAt: new Date(Date.now() - 24 * 60 * 60 * 1000), resolvedAt: new Date(Date.now() - 12 * 60 * 60 * 1000), coordinates: { lat: 26.3521, lng: 86.0710 } },
  { _id: '8', district: 'Papum Pare', state: 'Arunachal Pradesh', alertType: 'Forest Fire', severity: 'Medium', status: 'Resolved', message: 'Forest fire near highway', triggeredAt: new Date(Date.now() - 48 * 60 * 60 * 1000), resolvedAt: new Date(Date.now() - 36 * 60 * 60 * 1000), coordinates: { lat: 27.1023, lng: 93.6891 } },
];

const ndviData = [
  { _id: '1', district: 'Kamrup', ndviValue: 0.65, waterExtentKm2: 120, timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) },
  { _id: '2', district: 'Dibrugarh', ndviValue: 0.45, waterExtentKm2: 280, timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) },
  { _id: '3', district: 'Tinsukia', ndviValue: 0.35, waterExtentKm2: 450, timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) },
  { _id: '4', district: 'Sivasagar', ndviValue: 0.72, waterExtentKm2: 80, timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) },
  { _id: '5', district: 'Jorhat', ndviValue: 0.58, waterExtentKm2: 150, timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) },
  { _id: '6', district: 'Dimapur', ndviValue: 0.52, waterExtentKm2: 95, timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) },
  { _id: '7', district: 'Kohima', ndviValue: 0.61, waterExtentKm2: 70, timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) },
  { _id: '8', district: 'Mokokchung', ndviValue: 0.68, waterExtentKm2: 45, timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) },
  { _id: '9', district: 'Imphal East', ndviValue: 0.55, waterExtentKm2: 110, timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) },
  { _id: '10', district: 'Imphal West', ndviValue: 0.62, waterExtentKm2: 85, timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) },
  { _id: '11', district: 'Churachandpur', ndviValue: 0.48, waterExtentKm2: 180, timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) },
  { _id: '12', district: 'Shillong', ndviValue: 0.71, waterExtentKm2: 55, timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) },
  { _id: '13', district: 'Tura', ndviValue: 0.58, waterExtentKm2: 90, timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) },
  { _id: '14', district: 'Aizawl', ndviValue: 0.75, waterExtentKm2: 35, timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) },
  { _id: '15', district: 'Lunglei', ndviValue: 0.63, waterExtentKm2: 65, timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) },
  { _id: '16', district: 'Agartala', ndviValue: 0.47, waterExtentKm2: 200, timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) },
  { _id: '17', district: 'Dhalai', ndviValue: 0.54, waterExtentKm2: 130, timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) },
  { _id: '18', district: 'Papum Pare', ndviValue: 0.69, waterExtentKm2: 75, timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) },
  { _id: '19', district: 'East Kameng', ndviValue: 0.56, waterExtentKm2: 95, timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) },
  { _id: '20', district: 'Lower Subansiri', ndviValue: 0.42, waterExtentKm2: 220, timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) },
];

const pipeline = {
  status: 'Idle',
  lastRun: new Date(Date.now() - 6 * 60 * 60 * 1000),
  stages: [
    { name: 'NDVI Processing', status: 'idle' },
    { name: 'Water Extent Analysis', status: 'idle' },
    { name: 'Alert Generation', status: 'idle' }
  ]
};

module.exports = {
  districts,
  alerts,
  ndviData,
  pipeline
};