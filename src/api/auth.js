import { api } from './client';

export const authApi = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  
  register: (userData) => api.post('/auth/register', userData),
  
  getProfile: () => api.get('/auth/me'),
  
  updateProfile: (data) => api.put('/auth/profile', data),
  
  changePassword: (data) => api.put('/auth/change-password', data),
  
  logout: () => api.post('/auth/logout'),
  
  verifyEmail: (token) => api.get(`/auth/verify-email/${token}`),
  
  resendVerification: (email) => api.post('/auth/resend-verification', { email }),
};