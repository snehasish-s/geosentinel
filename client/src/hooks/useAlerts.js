import { useState, useEffect, useCallback } from 'react';
import { alertsAPI } from '../services/api';

export const useAlerts = (filters = {}) => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAlerts = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await alertsAPI.getAll(filters);
      setAlerts(data.data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchAlerts();
  }, [fetchAlerts]);

  const resolveAlert = async (id) => {
    await alertsAPI.resolve(id);
    fetchAlerts();
  };

  const deleteAlert = async (id) => {
    await alertsAPI.delete(id);
    fetchAlerts();
  };

  return { alerts, loading, error, refetch: fetchAlerts, resolveAlert, deleteAlert };
};