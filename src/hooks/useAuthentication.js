import * as React from 'react';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

import { getAuthUser, loginUser } from '../api';
import router from '../routes';
import useAuthStore from '../store/useAuthStore';
import isTokenExpired from '../utils/isTokenExpired';

export default function useAuthentication() {
  // This state is not global b/c not all pages need it (e.g., the checkout page)
  const [loginError, setLoginError] = React.useState('');
  const token = useAuthStore(state => state.token);
  const updateToken = useAuthStore(state => state.updateToken);
  const updateAuthUser = useAuthStore(state => state.updateAuthUser);
  const updateIsAuthUserLoading = useAuthStore(
    state => state.updateAuthUserLoading,
  );

  // FIXME Provide this Effect
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
        const authUser = await getAuthUser(token, source.token);

        updateAuthUser(authUser);
        updateIsAuthUserLoading(false);
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
  }, [token, updateToken, updateAuthUser, updateIsAuthUserLoading]);

  const { mutateAsync: loginMutate } = useMutation({
    mutationFn: loginUser,
    onMutate: () => {
      updateIsAuthUserLoading(true);
      updateAuthUser(null);
    },
    onSuccess: data => {
      updateToken(data);
    },
    onError: error => {
      error?.response?.status === 401
        ? setLoginError('Invalid credentials')
        : setLoginError(
            'Something went wrong (Are you connected to the internet)',
          );
    },
  });

  // This handler is not global b/c not all pages need it (e.g., the checkout page)
  const handleLogin = React.useCallback(
    async (username, password, callback) => {
      try {
        await loginMutate({ username, password });

        callback && callback();
      } catch (error) {
        // B/c the `onError` option of the `useMutation` is a callback func, errors are not considered as caught if
        // handled in the `onError` option, resulting in axios printing the error in the browser; therefore, this catch
        // block is needed
      }
    },
    [loginMutate],
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
