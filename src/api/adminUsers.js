import { BASE_URL } from '../data/constants';
import api from '../lib/axiosConfig';

export async function getAllUsers() {
  const response = await api.get(`${BASE_URL}/admin/users`);
  return response.data;
}

export async function getUserById({ params }) {
  const response = await api.get(`${BASE_URL}/admin/users/${params.id}`);
  return response.data;
}

export async function updateUserById({ params, request }) {
  const body = await request.json();
  const response = await api.patch(
    `${BASE_URL}/admin/users/${params.id}`,
    body,
  );
  return;
}

export async function deleteUserById({ params }) {
  const response = await api.delete(`${BASE_URL}/admin/users/${params.id}`);
  return;
}
