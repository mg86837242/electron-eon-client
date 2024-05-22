import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { MuiThemeProvider } from './components';
import router from './routes';

const queryClient = new QueryClient();

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
