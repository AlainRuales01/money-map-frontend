import axios from 'axios';
import { MONEY_MAP_API_EXECUTION_CONSTANTS } from '@/constants/moneyMapApiExecutionConstants';


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


moneyMapClient.interceptors.response.use(
  (response) => {
    const apiResponse = response.data;
    if (!apiResponse || !apiResponse.status || apiResponse.status !== MONEY_MAP_API_EXECUTION_CONSTANTS.SUCCESS) {
      return Promise.reject({
        status: apiResponse?.status || MONEY_MAP_API_EXECUTION_CONSTANTS.FAILURE,
        message: apiResponse?.message || 'An error occurred on the server',
        errors: apiResponse?.errors || [],
      });
    }
    return apiResponse;
  },
  (error) => {
    const apiErrorResponse = error.response?.data;
    return Promise.reject({
      status: apiErrorResponse?.status || MONEY_MAP_API_EXECUTION_CONSTANTS.FAILURE,
      message: apiErrorResponse?.message || 'An error occurred on the server',
      errors: apiErrorResponse?.errors || [],
    });
  }
);