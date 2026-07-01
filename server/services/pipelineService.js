let pipelineStatus = {
  ingestion: { status: 'running', lastRun: new Date(), message: 'Processing satellite data' },
  processing: { status: 'running', lastRun: new Date(), message: 'Running NDVI calculations' },
  alertEngine: { status: 'running', lastRun: new Date(), message: 'Monitoring thresholds' }
};

const getStatus = () => {
  return pipelineStatus;
};

const updateStatus = (stage, status, message) => {
  if (pipelineStatus[stage]) {
    pipelineStatus[stage] = {
      status,
      lastRun: new Date(),
      message: message || pipelineStatus[stage].message
    };
  }
  return pipelineStatus;
};

const triggerPipeline = async () => {
  updateStatus('ingestion', 'processing', 'Ingestion started');
  
  await new Promise(resolve => setTimeout(resolve, 1000));
  updateStatus('ingestion', 'running', 'Ingestion complete');
  
  updateStatus('processing', 'processing', 'Processing NDVI data');
  await new Promise(resolve => setTimeout(resolve, 1500));
  updateStatus('processing', 'running', 'Processing complete');
  
  updateStatus('alertEngine', 'processing', 'Checking alert thresholds');
  await new Promise(resolve => setTimeout(resolve, 1000));
  updateStatus('alertEngine', 'running', 'Alert check complete');
  
  return pipelineStatus;
};

module.exports = { getStatus, updateStatus, triggerPipeline };