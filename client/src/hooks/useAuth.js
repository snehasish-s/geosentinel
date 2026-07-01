import { useState, useEffect } from 'react';
import { pipelineAPI } from '../services/api';

export const usePipeline = () => {
  const [status, setStatus] = useState({
    ingestion: { status: 'running', lastRun: new Date(), message: 'Processing' },
    processing: { status: 'running', lastRun: new Date(), message: 'Processing' },
    alertEngine: { status: 'running', lastRun: new Date(), message: 'Processing' }
  });
  const [loading, setLoading] = useState(true);

  const fetchStatus = async () => {
    try {
      const { data } = await pipelineAPI.getStatus();
      setStatus(data.data);
    } catch (err) {
      console.error('Pipeline status error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 10000);
    return () => clearInterval(interval);
  }, []);

  const trigger = async () => {
    setLoading(true);
    try {
      await pipelineAPI.trigger();
      await fetchStatus();
    } catch (err) {
      console.error('Pipeline trigger error:', err);
    }
  };

  return { status, loading, trigger };
};