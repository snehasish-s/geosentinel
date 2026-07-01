import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error?.response?.status, error?.message);
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  register: (data) => api.post('/auth/register', data),
  getMe: () => api.get('/auth/me'),
};

export const alertsAPI = {
  getAll: (params) => api.get('/alerts', { params }),
  getById: (id) => api.get(`/alerts/${id}`),
  create: (data) => api.post('/alerts', data),
  resolve: (id) => api.patch(`/alerts/${id}/resolve`),
  delete: (id) => api.delete(`/alerts/${id}`),
  exportCSV: () => api.get('/alerts/export/csv', { responseType: 'blob' }),
};

export const districtsAPI = {
  getAll: () => api.get('/districts'),
  getSummary: () => api.get('/districts/summary'),
  getById: (id) => api.get(`/districts/${id}`),
  getHistory: (id, days = 30) => api.get(`/districts/${id}/history`, { params: { days } }),
};

export const ndviAPI = {
  getLatest: () => api.get('/ndvi/latest'),
  getHistory: (districtId, days = 30) => api.get(`/ndvi/${districtId}`, { params: { days } }),
  calculate: (districtId) => api.post('/ndvi/calculate', { districtId }),
};

export const uploadsAPI = {
  getAll: () => api.get('/uploads'),
  upload: (formData) => api.post('/uploads', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  delete: (id) => api.delete(`/uploads/${id}`),
  exportReport: () => api.get('/uploads/export/report', { responseType: 'blob' }),
};

export const pipelineAPI = {
  getStatus: () => api.get('/pipeline/status'),
  trigger: () => api.post('/pipeline/trigger'),
};

export default api;