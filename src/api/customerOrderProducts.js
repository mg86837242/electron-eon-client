import { BASE_URL } from '../data/constants';
import api from '../lib/axiosConfig';

export async function getOrderProductById({ params }) {
  const response = await api.get(
    `${BASE_URL}/customer/order-products/${params.id}`,
  );
  return response.data;
}

export async function getOrderProductByOrderId({ params }) {
  const response = await api.get(
    `${BASE_URL}/customer/order-products/by-order-id/${params.orderId}`,
  );
  return response.data;
}
