import { BASE_URL } from '../data/constants';
import api from '../lib/axiosConfig';

export async function getCartById({ params }) {
  const response = await api.get(`${BASE_URL}/customer/carts/${params.id}`);
  return response.data;
}

export const getCartsForCurrUser = async () => {
  const response = await api.get(`${BASE_URL}/customer/carts/current-user`);
  return response.data;
};

// For catalog page
export async function upsertProdQtyInCartForCurrUser({ request }) {
  const submitted = await request.json();
  const body = {};
  const response = await api.post(
    `${BASE_URL}/customer/carts/current-user/products/${submitted.productId}/upsert-quantity?quantity=${submitted.quantity}`,
    body,
  );
  return;
}

// For catalog page
export const incrementProdQtyInCartForCurrUser = productId =>
  api.patch(
    `${BASE_URL}/customer/carts/current-user/products/${productId}/increment-quantity`,
    {},
  );

// For catalog page
export const decrementProdQtyInCartForCurrUser = productId =>
  api.patch(
    `${BASE_URL}/customer/carts/current-user/products/${productId}/decrement-quantity`,
    {},
  );

// For individual product page
export async function updateProdQtyInCartById({ request }) {
  const submitted = await request.json();
  const body = {};
  const response = await api.patch(
    `${BASE_URL}/customer/carts/${submitted.id}/update-quantity?quantity=${submitted.quantity}`,
    body,
  );
  return;
}

// For dedicated cart page or admin page
export const incrementProdQtyInCartById = id =>
  api.patch(`${BASE_URL}/customer/carts/${id}/increment-quantity`, {});

// For dedicated cart page or admin page
export const decrementProdQtyInCartById = id =>
  api.patch(`${BASE_URL}/customer/carts/${id}/decrement-quantity`, {});

export const deleteCartById = id =>
  api.delete(`${BASE_URL}/customer/carts/${id}`);

export async function deleteCartForCurrUser() {
  const response = await api.delete(`${BASE_URL}/customer/carts/current-user`);
  return;
}
