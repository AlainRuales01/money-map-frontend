// src/services/api/clients/mainClient.ts
import axios from 'axios';

export const moneyMapClient = axios.create({
  baseURL: import.meta.env.VITE_API_MAIN_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});


moneyMapClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});