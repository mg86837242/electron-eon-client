import * as React from 'react';
import { RouterProvider } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import queryClient from './lib/queryClientConfig';
import { MuiThemeProvider } from './components';
import router from './routes';
import useClientSideTokenValidation from './hooks/useClientSideTokenValidation';

export default function App() {
  useClientSideTokenValidation;

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
