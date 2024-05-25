import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import createAuthSlice from './authSlice';
import createCheckoutSlice from './checkoutSlice';

const useAuthStore = create(
  persist(
    (...args) => ({
      ...createAuthSlice(...args),
      ...createCheckoutSlice(...args),
    }),
    {
      name: `${import.meta.env.VITE_APP_NAME}-token`,
      partialize: state => ({
        token: state.token,
      }),
    },
  ),
);

export default useAuthStore;
