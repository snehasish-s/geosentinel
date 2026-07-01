const Alert = require('../models/Alert');
const asyncHandler = require('express-async-handler');
const { Parser } = require('json2csv');

const getAlerts = asyncHandler(async (req, res) => {
  const { district, severity, type, status } = req.query;
  const filter = {};
  
  if (district) filter.district = new RegExp(district, 'i');
  if (severity) filter.severity = severity;
  if (type) filter.alertType = type;
  if (status) filter.status = status;

  const alerts = await Alert.find(filter).sort({ triggeredAt: -1 });
  res.json({ success: true, data: alerts });
});

const getAlertById = asyncHandler(async (req, res) => {
  const alert = await Alert.findById(req.params.id);
  if (!alert) {
    res.status(404).json({ success: false, message: 'Alert not found' });
    return;
  }
  res.json({ success: true, data: alert });
});

const createAlert = asyncHandler(async (req, res) => {
  const alert = await Alert.create(req.body);
  res.status(201).json({ success: true, data: alert });
});

const resolveAlert = asyncHandler(async (req, res) => {
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
  const alert = await Alert.findByIdAndDelete(req.params.id);
  if (!alert) {
    res.status(404).json({ success: false, message: 'Alert not found' });
    return;
  }
  res.json({ success: true, message: 'Alert deleted' });
});

const exportAlertsCSV = asyncHandler(async (req, res) => {
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