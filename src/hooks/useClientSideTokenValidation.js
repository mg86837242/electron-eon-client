import * as React from 'react';
import useAuthStore from '../store/useAuthStore';
import isTokenExpired from '../utils/isTokenExpired';

export default function useClientSideTokenValidation() {
  const token = useAuthStore(state => state.token);
  const updateToken = useAuthStore(state => state.updateToken);

  // Validate the token persisted on the client-side
  React.useEffect(() => {
    if (!token) {
      return;
    }

    if (isTokenExpired(token)) {
      console.error(
        'You have been logged out because your bearer token has expired',
      );
      updateToken('');
      router.navigate('/');
      return;
    }
  }, [token, updateToken]);
}
