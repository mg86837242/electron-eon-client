import { BASE_URL } from '../data/constants';
import api from '../lib/axiosConfig';

export async function getOrdersForCurrUser() {
  const response = await api.get(`${BASE_URL}/customer/orders/current-user`);
  return response;
}

export const getOrderByIdForCurrUser = async id => {
  const response = await api.get(`${BASE_URL}/customer/orders/${id}`);
  return response.data;
};

export const addOrderForCurrUser = async orderData => {
  const response = await api.post(
    `${BASE_URL}/customer/orders/current-user`,
    orderData,
  );
  return response.data;
};
