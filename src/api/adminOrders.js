import { BASE_URL } from '../data/constants';
import api from '../lib/axiosConfig';

export async function getAllOrders() {
  const response = await api.get(`${BASE_URL}/admin/orders`);
  return response.data;
}

export async function getOrderById({ params }) {
  const response = await api.get(`${BASE_URL}/admin/orders/${params.id}`);
  return response.data;
}

export async function getOrdersByUserId({ params }) {
  const response = await api.get(
    `${BASE_URL}/admin/orders/by-user-id/${params.userId}`,
  );
  return response.data;
}

export async function updateOrderById({ params, request }) {
  const body = await request.json();
  const response = await api.patch(
    `${BASE_URL}/admin/orders/${params.id}`,
    body,
  );
  return;
}

export async function deleteOrderById({ params }) {
  const response = await api.delete(`${BASE_URL}/admin/orders/${params.id}`);
  return;
}
