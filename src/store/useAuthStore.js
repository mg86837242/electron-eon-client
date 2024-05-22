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
        // TODO band-aid solution, `orderResponse` shouldn't persist, if the user refresh or close, the individual order page should rely on `useQuery` rather than store - the purpose of this state in store is purely for optimistic UI purposes
        orderResponse: state.orderResponse,
      }),
    },
  ),
);

export default useAuthStore;
