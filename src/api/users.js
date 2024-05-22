import { BASE_URL } from '../data/constants';
import api from '../lib/axiosConfig';

export const registerUser = registrationData =>
  api.post(`${BASE_URL}/users/register`, registrationData);
