const express = require('express');
const router = express.Router();
const { getAlerts, getAlertById, createAlert, resolveAlert, deleteAlert, exportAlertsCSV } = require('../controllers/alertsController');
const { protect } = require('../middleware/auth');

router.get('/export/csv', protect, exportAlertsCSV);
router.route('/').get(protect, getAlerts).post(protect, createAlert);
router.route('/:id').get(protect, getAlertById).delete(protect, deleteAlert);
router.patch('/:id/resolve', protect, resolveAlert);

module.exports = router;