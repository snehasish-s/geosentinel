import { useState, useEffect, useCallback } from 'react';
import { ndviAPI, districtsAPI } from '../services/api';

export const useNDVI = (districtId = null) => {
  const [ndviData, setNdviData] = useState([]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchLatest = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await ndviAPI.getLatest();
      setNdviData(data.data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchHistory = useCallback(async (id, days = 30) => {
    try {
      const { data } = await ndviAPI.getHistory(id, days);
      setHistory(data.data);
    } catch (err) {
      setError(err.message);
    }
  }, []);

  useEffect(() => {
    fetchLatest();
    if (districtId) {
      fetchHistory(districtId);
    }
  }, [fetchLatest, fetchHistory, districtId]);

  return { ndviData, history, loading, error, refetch: fetchLatest };
};

export const useDistricts = () => {
  const [districts, setDistricts] = useState([]);
  const [summary, setSummary] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDistricts = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await districtsAPI.getSummary();
      setSummary(data.data);
      setDistricts(data.data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDistricts();
  }, [fetchDistricts]);

  return { districts, summary, loading, error, refetch: fetchDistricts };
};