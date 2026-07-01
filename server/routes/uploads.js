const express = require('express');
const router = express.Router();
const { getUploads, uploadFile, deleteUpload, exportReport } = require('../controllers/uploadsController');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.get('/export/report', protect, exportReport);
router.route('/').get(protect, getUploads).post(protect, upload.single('file'), uploadFile);
router.route('/:id').delete(protect, deleteUpload);

module.exports = router;