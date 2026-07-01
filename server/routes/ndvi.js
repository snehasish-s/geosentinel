const express = require('express');
const router = express.Router();
const { getLatestNDVI, getNDVIHistory, calculateNewNDVI } = require('../controllers/ndviController');
const { protect } = require('../middleware/auth');

router.get('/latest', protect, getLatestNDVI);
router.post('/calculate', protect, calculateNewNDVI);
router.get('/:districtId', protect, getNDVIHistory);

module.exports = router;