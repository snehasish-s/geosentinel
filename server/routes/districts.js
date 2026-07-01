const express = require('express');
const router = express.Router();
const { getDistricts, getDistrictById, getDistrictHistory, getDistrictsSummary } = require('../controllers/districtsController');
const { protect } = require('../middleware/auth');

router.get('/summary', protect, getDistrictsSummary);
router.get('/', protect, getDistricts);
router.get('/:id', protect, getDistrictById);
router.get('/:id/history', protect, getDistrictHistory);

module.exports = router;