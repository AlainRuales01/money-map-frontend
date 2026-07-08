import axios from 'axios';
import { MONEY_MAP_API_EXECUTION_CONSTANTS } from '@/constants/moneyMapApiExecutionConstants';
import type { ApiError } from '@/types/api/ApiError';


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
      const apiError: ApiError = {
        status: apiResponse?.status || MONEY_MAP_API_EXECUTION_CONSTANTS.FAILURE,
        message: apiResponse?.message || 'An error occurred on the server',
        errors: apiResponse?.errors || [],
      }
      return Promise.reject(apiError);
    }
    return apiResponse.data;
  },
  (error) => {
    const apiErrorResponse = error.response?.data;

    const apiError: ApiError = {
      status: apiErrorResponse?.status || MONEY_MAP_API_EXECUTION_CONSTANTS.FAILURE,
      message: apiErrorResponse?.message || 'An error occurred on the server',
      errors: apiErrorResponse?.errors || [],
    }

    return Promise.reject(apiError);
  }
);