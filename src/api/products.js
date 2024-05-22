import { BASE_URL } from '../data/constants';
import api from '../lib/axiosConfig';

export const getAllProducts = async () => {
  const response = await api.get(`${BASE_URL}/products`);
  return response.data;
};

export const getProductById = async productId => {
  const response = await api.get(`${BASE_URL}/products/${productId}`);
  return response.data;
};

export const getProductsByCategory = async category => {
  const response = await api.get(`${BASE_URL}/products?category=${category}`);
  return response.data;
};
