import * as React from 'react';
import { RouterProvider } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import queryClient from './lib/queryClientConfig';
import useAuthStore from './store/useAuthStore';
import isTokenExpired from './utils/isTokenExpired';
import { MuiThemeProvider } from './components';
import router from './routes';

export default function App() {
  const token = useAuthStore(state => state.token);
  const updateToken = useAuthStore(state => state.updateToken);

  // FIX code extraction
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

  return (
    <QueryClientProvider client={queryClient}>
      <MuiThemeProvider>
        <RouterProvider
          router={router}
          fallbackElement={<p>Performing initial data load</p>}
        />
      </MuiThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
