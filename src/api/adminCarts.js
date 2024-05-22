import { BASE_URL } from '../data/constants';
import api from '../lib/axiosConfig';

export async function getCartsByUserId({ params }) {
  const response = await api.get(
    `${BASE_URL}/admin/carts/by-user-id/${params.userId}`,
  );
  return response.data;
}

export async function deleteCartsByUserId({ params }) {
  const response = await api.delete(
    `${BASE_URL}/admin/carts/by-user-id/${params.userId}`,
  );
  return response;
}
