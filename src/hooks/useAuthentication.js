import * as React from 'react';
import { useMutation } from '@tanstack/react-query';

import { loginUser } from '../api';
import useAuthStore from '../store/useAuthStore';

export default function useAuthentication() {
  // This state is not global b/c not all pages need it (e.g., the checkout page)
  const [loginError, setLoginError] = React.useState('');
  const updateToken = useAuthStore(state => state.updateToken);

  const { mutateAsync: loginMutate } = useMutation({
    mutationFn: loginUser,
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

        callback && callback();
      } catch (error) {
        console.error('Error logging out:', error);
      }
    },
    [updateToken],
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
