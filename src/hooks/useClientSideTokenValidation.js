import * as React from 'react';

import router from '../routes';
import useAuthStore from '../store/useAuthStore';
import isTokenExpired from '../utils/isTokenExpired';

export default function useClientSideTokenValidation() {
  const token = useAuthStore(state => state.token);
  const updateToken = useAuthStore(state => state.updateToken);

  // Validate the token persisted on the client-side
  React.useEffect(() => {
    if (!token) {
      // For this case, navigation will be handled by <RequireAuth> i/o here
      return;
    }

    if (isTokenExpired(token)) {
      updateToken('');
      console.error(
        'You have been logged out because your bearer token has expired',
      );
      router.navigate('/');
      return;
    }
  }, [token, updateToken]);
}

// TODO there's currently no code implementation to immediately log out the user when the user tampers with, esp. deletes, token persisted in `localStorage`
