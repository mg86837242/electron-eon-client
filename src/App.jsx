import { RouterProvider } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';

import { MuiThemeProvider } from './components';
import router from './routes';
import queryClient from './lib/queryClientConfig';

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MuiThemeProvider>
        <RouterProvider
          router={router}
          fallbackElement={<p>Performing initial data load</p>}
        />
      </MuiThemeProvider>
    </QueryClientProvider>
  );
}
