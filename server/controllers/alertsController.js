const Alert = require('../models/Alert');
const asyncHandler = require('express-async-handler');
const { Parser } = require('json2csv');
const mockData = require('../utils/mockData');

const getAlerts = asyncHandler(async (req, res) => {
  const { district, severity, type, status } = req.query;
  
  if (global.mockDB) {
    let alerts = [...mockData.alerts];
    if (district) alerts = alerts.filter(a => a.district.toLowerCase().includes(district.toLowerCase()));
    if (severity) alerts = alerts.filter(a => a.severity === severity);
    if (type) alerts = alerts.filter(a => a.alertType === type);
    if (status) alerts = alerts.filter(a => a.status === status);
    res.json({ success: true, data: alerts.sort((a, b) => new Date(b.triggeredAt) - new Date(a.triggeredAt)) });
    return;
  }

  const filter = {};
  if (district) filter.district = new RegExp(district, 'i');
  if (severity) filter.severity = severity;
  if (type) filter.alertType = type;
  if (status) filter.status = status;

  const alerts = await Alert.find(filter).sort({ triggeredAt: -1 });
  res.json({ success: true, data: alerts });
});

const getAlertById = asyncHandler(async (req, res) => {
  if (global.mockDB) {
    const alert = mockData.alerts.find(a => a._id === req.params.id);
    if (!alert) {
      res.status(404).json({ success: false, message: 'Alert not found' });
      return;
    }
    res.json({ success: true, data: alert });
    return;
  }

  const alert = await Alert.findById(req.params.id);
  if (!alert) {
    res.status(404).json({ success: false, message: 'Alert not found' });
    return;
  }
  res.json({ success: true, data: alert });
});

const createAlert = asyncHandler(async (req, res) => {
  if (global.mockDB) {
    const newAlert = {
      _id: String(mockData.alerts.length + 1),
      ...req.body,
      triggeredAt: new Date()
    };
    mockData.alerts.push(newAlert);
    res.status(201).json({ success: true, data: newAlert });
    return;
  }

  const alert = await Alert.create(req.body);
  res.status(201).json({ success: true, data: alert });
});

const resolveAlert = asyncHandler(async (req, res) => {
  if (global.mockDB) {
    const alertIndex = mockData.alerts.findIndex(a => a._id === req.params.id);
    if (alertIndex === -1) {
      res.status(404).json({ success: false, message: 'Alert not found' });
      return;
    }
    mockData.alerts[alertIndex] = {
      ...mockData.alerts[alertIndex],
      status: 'Resolved',
      resolvedAt: new Date()
    };
    res.json({ success: true, data: mockData.alerts[alertIndex] });
    return;
  }

  const alert = await Alert.findByIdAndUpdate(
    req.params.id,
    { status: 'Resolved', resolvedAt: new Date() },
    { new: true }
  );
  if (!alert) {
    res.status(404).json({ success: false, message: 'Alert not found' });
    return;
  }
  res.json({ success: true, data: alert });
});

const deleteAlert = asyncHandler(async (req, res) => {
  if (global.mockDB) {
    const alertIndex = mockData.alerts.findIndex(a => a._id === req.params.id);
    if (alertIndex === -1) {
      res.status(404).json({ success: false, message: 'Alert not found' });
      return;
    }
    mockData.alerts.splice(alertIndex, 1);
    res.json({ success: true, message: 'Alert deleted' });
    return;
  }

  const alert = await Alert.findByIdAndDelete(req.params.id);
  if (!alert) {
    res.status(404).json({ success: false, message: 'Alert not found' });
    return;
  }
  res.json({ success: true, message: 'Alert deleted' });
});

const exportAlertsCSV = asyncHandler(async (req, res) => {
  if (global.mockDB) {
    const alerts = mockData.alerts;
    const fields = ['district', 'state', 'alertType', 'severity', 'status', 'triggeredAt', 'resolvedAt'];
    const parser = new Parser({ fields });
    const csv = parser.parse(alerts);

    res.header('Content-Type', 'text/csv');
    res.attachment('alerts.csv');
    res.send(csv);
    return;
  }

  const alerts = await Alert.find({}).sort({ triggeredAt: -1 });
  const fields = ['district', 'state', 'alertType', 'severity', 'ndviValue', 'waterExtentKm2', 'status', 'triggeredAt', 'resolvedAt'];
  const parser = new Parser({ fields });
  const csv = parser.parse(alerts);

  res.header('Content-Type', 'text/csv');
  res.attachment('alerts.csv');
  res.send(csv);
});

module.exports = {
  getAlerts,
  getAlertById,
  createAlert,
  resolveAlert,
  deleteAlert,
  exportAlertsCSV
};