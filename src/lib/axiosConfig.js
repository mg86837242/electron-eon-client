import axios from 'axios';

import { BASE_URL } from '../data/constants';
import useAuthStore from '../store/useAuthStore';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 5_000,
});

api.interceptors.request.use(
  config => {
    const token = useAuthStore.getState().token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

export default api;
