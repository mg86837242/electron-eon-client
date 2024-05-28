import { api } from '../lib/axiosConfig';

export const registerUser = registrationData =>
  api.post(`/users/register`, registrationData);
