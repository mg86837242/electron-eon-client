import { BASE_URL } from '../data/constants';
import api from '../lib/axiosConfig';

export async function getCurrUser() {
  const response = await api.get(`${BASE_URL}/admin/users/current-user`);
  return response.data;
}

export async function updateUserById({ request }) {
  const body = await request.json();
  const response = await api.patch(
    `${BASE_URL}/admin/users/current-user`,
    body,
  );
  return;
}

export async function deleteUserById() {
  const response = await api.delete(`${BASE_URL}/admin/users/current-user`);
  return;
}
