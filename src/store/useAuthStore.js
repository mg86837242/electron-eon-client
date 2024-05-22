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
        // TODO band-aid solution, `orderResponse` shouldn't be persisted, if the user were to refresh or close, the individual order page should rely on `useQuery` rather than the store - the purpose of this state in store should be purely for optimistic UI purposes
        orderResponse: state.orderResponse,
      }),
    },
  ),
);

export default useAuthStore;
