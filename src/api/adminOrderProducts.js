import { BASE_URL } from '../data/constants';
import api from '../lib/axiosConfig';

export async function addOrderProduct({ request }) {
  const body = await request.json();
  const response = await api.post(`${BASE_URL}/admin/order-product`, body);
  return;
}

export async function updateProdQtyInOrderById({ request }) {
  const submitted = await request.json();
  const body = {};
  const response = await api.patch(
    `${BASE_URL}/admin/order-product/${submitted.id}/update-quantity?update=${submitted.quantity}`,
    body,
  );
  return;
}

export async function incrementProdQtyInOrderById({ request }) {
  const submitted = await request.json();
  const body = {};
  const response = await api.patch(
    `${BASE_URL}/admin/order-product/${submitted.id}/increment-quantity`,
    body,
  );
  return;
}

export async function decrementProdQtyInOrderById({ request }) {
  const submitted = await request.json();
  const body = {};
  const response = await api.patch(
    `${BASE_URL}/admin/order-product/${submitted.id}/decrement-quantity`,
    body,
  );
  return;
}

export async function deleteOrderProductById({ params }) {
  const response = await api.delete(
    `${BASE_URL}/admin/order-product/${params.id}`,
  );
  return;
}

export async function deleteOrderProductByOrderId({ params }) {
  const response = await api.delete(
    `${BASE_URL}/admin/order-product/${params.orderId}`,
  );
  return;
}
