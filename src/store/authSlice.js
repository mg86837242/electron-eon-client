import axios from 'axios';

import { BASE_URL } from '../data/constants';
import useAuthentication from '../hooks/useAuthentication';

const createAuthSlice = (set, get) => ({
  // The initial value empty str will be short-circuited if the `token` state has been updated by an action (e.g., `updateToken`), as the persist middleware first evaluates the state persisted in the `localStorage`
  token: '',
  authUser: null,
  isAuthUserLoading: true,
  fetchToken: async (usernameIn, passwordIn) => {
    const requestOptions = {
      auth: {
        username: usernameIn,
        password: passwordIn,
      },
      // withCredentials: true, => NB Don't add this, or else a browser popup will be displayed when entering wrong credentials to the `Authorization` header; `withCredentials: true` is generally used for cookie-based authentication, not for Basic or Bearer token authentication.
    };

    const response = await axios.post(
      `${BASE_URL}/auth/login`,
      {},
      requestOptions,
    );
    /**
     * The following line won't be reached if fetch error occurs, error will propagate to the {@link useAuthentication} hook
     */
    set({ token: await response.data });
  },
  fetchAuthUser: async cancelToken => {
    const requestOptions = {
      headers: {
        Authorization: `Bearer ${get().token}`,
      },
      cancelToken,
    };

    const response = await axios.get(`${BASE_URL}/auth/me`, requestOptions);

    set({ authUser: await response.data });
  },
  updateToken: token => set({ token }),
  updateAuthUser: authUser => set({ authUser }),
  updateAuthUserLoading: isAuthUserLoading => set({ isAuthUserLoading }),
});

export default createAuthSlice;
