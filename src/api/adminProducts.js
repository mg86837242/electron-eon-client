import { BASE_URL } from '../data/constants';
import api from '../lib/axiosConfig';

export async function addProduct({ request }) {
  const body = await request.json();
  const response = await api.post(`${BASE_URL}/admin/products`, body);
  return;
}

export async function updateProductById({ params, request }) {
  const body = await request.json();
  const response = await api.patch(
    `${BASE_URL}/admin/products/${params.id}`,
    body,
  );
  return;
}

export async function deleteProductById({ params }) {
  const response = await api.delete(`${BASE_URL}/admin/products/${params.id}`);
  return;
}
