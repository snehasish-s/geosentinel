const Upload = require('../models/Upload');
const asyncHandler = require('express-async-handler');
const fs = require('fs');
const { Parser } = require('json2csv');

const getUploads = asyncHandler(async (req, res) => {
  const uploads = await Upload.find({}).sort({ uploadedAt: -1 });
  res.json({ success: true, data: uploads });
});

const uploadFile = asyncHandler(async (req, res) => {
  if (!req.file) {
    res.status(400).json({ success: false, message: 'No file uploaded' });
    return;
  }

  const upload = await Upload.create({
    filename: req.file.filename,
    originalName: req.file.originalname,
    mimetype: req.file.mimetype,
    size: req.file.size,
    path: req.file.path,
    status: 'Queued'
  });

  setTimeout(async () => {
    await Upload.findByIdAndUpdate(upload._id, { status: 'Processing' });
  }, 1000);

  setTimeout(async () => {
    await Upload.findByIdAndUpdate(upload._id, { status: 'Done', processedAt: new Date() });
  }, 3000);

  res.status(201).json({ success: true, data: upload });
});

const deleteUpload = asyncHandler(async (req, res) => {
  const upload = await Upload.findById(req.params.id);
  if (!upload) {
    res.status(404).json({ success: false, message: 'Upload not found' });
    return;
  }

  try {
    fs.unlinkSync(upload.path);
  } catch (err) {
    console.error('File delete error:', err);
  }

  await Upload.findByIdAndDelete(req.params.id);
  res.json({ success: true, message: 'Upload deleted' });
});

const exportReport = asyncHandler(async (req, res) => {
  const uploads = await Upload.find({}).sort({ uploadedAt: -1 });

  const fields = ['originalName', 'mimetype', 'size', 'status', 'uploadedAt', 'processedAt'];
  const parser = new Parser({ fields });
  const csv = parser.parse(uploads);

  res.header('Content-Type', 'text/csv');
  res.attachment('processing-report.csv');
  res.send(csv);
});

module.exports = {
  getUploads,
  uploadFile,
  deleteUpload,
  exportReport
};