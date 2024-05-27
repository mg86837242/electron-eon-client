import * as React from 'react';
import axios from 'axios';

import router from '../routes';
import useAuthStore from '../store/useAuthStore';
import isTokenExpired from '../utils/isTokenExpired';

export default function useAuthentication() {
  // This state is not global b/c not all pages need it (e.g., the checkout page)
  const [loginError, setLoginError] = React.useState('');
  const token = useAuthStore(state => state.token);
  const fetchToken = useAuthStore(state => state.fetchToken);
  const fetchAuthUser = useAuthStore(state => state.fetchAuthUser);
  const updateToken = useAuthStore(state => state.updateToken);
  const updateAuthUser = useAuthStore(state => state.updateAuthUser);
  const updateIsAuthUserLoading = useAuthStore(
    state => state.updateAuthUserLoading,
  );

  // Validate the persisted token, then sync with db by using the persisted token
  React.useEffect(() => {
    if (!token) {
      updateIsAuthUserLoading(false);
      return;
    }

    if (isTokenExpired(token)) {
      console.error(
        'You have been logged out because your bearer token has expired',
      );
      updateToken('');
      updateAuthUser(null);
      updateIsAuthUserLoading(false);
      router.navigate('/');
      return;
    }

    const source = axios.CancelToken.source();
    (async () => {
      try {
        await fetchAuthUser(source.token);
      } catch (error) {
        if (!axios.isCancel(error)) {
          console.error(
            'You have been logged out because your bearer token caused an error',
          );
          updateToken('');
          updateAuthUser(null);
          updateIsAuthUserLoading(false);
          router.navigate('/');
        }
      }
    })();
    return () => {
      source.cancel('Operation canceled by the user.');
    };
  }, [
    token,
    fetchAuthUser,
    updateToken,
    updateAuthUser,
    updateIsAuthUserLoading,
  ]);

  // This handler is not global b/c not all pages need it (e.g., the checkout page)
  const handleLogin = React.useCallback(
    async (usernameIn, passwordIn, callback) => {
      updateAuthUser(null);
      updateIsAuthUserLoading(true);

      try {
        // Fetched token will be sent to the store and persisted, for further use in the Effect hook; Effect hook will auto fire after the `token` state - a dependency - is changed
        await fetchToken(usernameIn, passwordIn);

        callback && callback();
      } catch (error) {
        if (error?.response?.status === 401) {
          setLoginError('Invalid credentials');
        } else {
          setLoginError(
            'Something went wrong (Are you connected to the internet)',
          );
        }
      }
    },
    [fetchToken, updateAuthUser, updateIsAuthUserLoading],
  );

  // This handler is not global b/c not all pages need it (e.g., the checkout page)
  const handleLogout = React.useCallback(
    callback => {
      try {
        updateToken('');
        updateAuthUser(null);

        callback && callback();
      } catch (error) {
        console.error('Error logging out:', error);
      }
    },
    [updateToken, updateAuthUser],
  );

  return React.useMemo(
    () => ({
      loginError,
      handleLogin,
      handleLogout,
    }),
    [loginError, handleLogin, handleLogout],
  );
}
