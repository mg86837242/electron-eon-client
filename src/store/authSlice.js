const createAuthSlice = (set, get) => ({
  // The initial value empty str will be short-circuited if the `token` state has been updated by any action (e.g., `updateToken`), as the persist middleware first evaluates the state persisted in the `localStorage`
  token: '',
  authUser: null,
  isAuthUserLoading: true,
  updateToken: newToken => set({ token: newToken }),
  updateAuthUser: newAuthUser => set({ authUser: newAuthUser }),
  updateAuthUserLoading: newIsAuthUserLoading =>
    set({ isAuthUserLoading: newIsAuthUserLoading }),
});

export default createAuthSlice;
