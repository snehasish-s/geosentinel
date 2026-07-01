const express = require('express');
const router = express.Router();
const { getPipelineStatus, triggerPipelineRun } = require('../controllers/pipelineController');
const { protect } = require('../middleware/auth');

router.get('/status', protect, getPipelineStatus);
router.post('/trigger', protect, triggerPipelineRun);

module.exports = router;