import { BASE_URL } from '../data/constants';
import api from '../lib/axiosConfig';

export async function getOrderById({ params }) {
  const response = await api.get(`${BASE_URL}/customer/orders/${params.id}`);
  return response;
}

export async function getOrdersForCurrUser() {
  const response = await api.get(`${BASE_URL}/customer/orders/current-user`);
  return response;
}

export const addOrderForCurrUser = async orderData => {
  const response = await api.post(
    `${BASE_URL}/customer/orders/current-user`,
    orderData,
  );
  return response.data;
};
