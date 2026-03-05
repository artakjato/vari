import axios from 'axios';
import type { RoleSalaryResponse } from './types';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('vari_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const fetchMapData = () => api.get('/api/map');
export const fetchRole = (slug: string) => api.get(`/api/roles/${slug}`);
export const fetchRoleSalary = (slug: string, params?: { sectorCode?: string; year?: string }) =>
  api.get<RoleSalaryResponse>(`/api/salaries/${slug}`, { params });
export const searchAPI = (q: string) => api.get(`/api/search?q=${q}`);
export const fetchJobCount = (roleSlug: string) => api.get(`/api/jobs/${roleSlug}`);

export const register = (data: { email: string; password: string; displayName: string }) =>
  api.post('/api/auth/register', data);
export const login = (data: { email: string; password: string }) =>
  api.post('/api/auth/login', data);
export const getMe = () => api.get('/api/me');

export const getPins = () => api.get('/api/me/pins');
export const createPin = (data: { targetType: string; targetId: string; notes?: string; completedSteps?: number[] }) =>
  api.post('/api/me/pins', data);
export const updatePin = (id: string, data: { notes?: string; completedSteps?: number[] }) =>
  api.patch(`/api/me/pins/${id}`, data);
export const deletePin = (id: string) => api.delete(`/api/me/pins/${id}`);
