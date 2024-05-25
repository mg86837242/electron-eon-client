import { BASE_URL } from '../data/constants';
import api from '../lib/axiosConfig';

export const getAllProdsForCurrUser = async () => {
  const response = await api.get(`${BASE_URL}/customer/products`);
  return response.data;
};

export const getProdByIdForCurrUser = async id => {
  const response = await api.get(`${BASE_URL}/customer/products/${id}`);
  return response.data;
};

export const getProdsByCategoryForCurrUser = async category => {
  const response = await api.get(
    `${BASE_URL}/customer/products?category=${category}`,
  );
  return response.data;
};
