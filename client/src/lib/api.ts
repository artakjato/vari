import axios from 'axios';

// All API calls go through this single axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
});

// Request interceptor: automatically attach JWT to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('vari_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Map data endpoints
export const fetchMapData = () => api.get('/api/map');
export const fetchRole = (slug: string) => api.get(`/api/roles/${slug}`);
export const searchAPI = (q: string) => api.get(`/api/search?q=${q}`);

// Auth endpoints
export const register = (data: { email: string; password: string; displayName: string }) =>
  api.post('/api/auth/register', data);
export const login = (data: { email: string; password: string }) =>
  api.post('/api/auth/login', data);
export const getMe = () => api.get('/api/me');

// Pin endpoints
export const getPins = () => api.get('/api/me/pins');
export const createPin = (data: { targetType: string; targetId: string; notes?: string }) =>
  api.post('/api/me/pins', data);
export const updatePin = (id: string, notes: string) =>
  api.patch(`/api/me/pins/${id}`, { notes });
export const deletePin = (id: string) => api.delete(`/api/me/pins/${id}`);