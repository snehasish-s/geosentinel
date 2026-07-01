const asyncHandler = require('express-async-handler');
const { getStatus, triggerPipeline } = require('../services/pipelineService');

const getPipelineStatus = asyncHandler(async (req, res) => {
  const status = getStatus();
  res.json({ success: true, data: status });
});

const triggerPipelineRun = asyncHandler(async (req, res) => {
  const status = await triggerPipeline();
  res.json({ success: true, data: status });
});

module.exports = {
  getPipelineStatus,
  triggerPipelineRun
};