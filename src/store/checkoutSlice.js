const createCheckoutSlice = set => ({
  checkoutItems: [],
  orderResponse: null,
  updateCheckoutItems: checkoutItems => set({ checkoutItems }),
  updateOrderResponse: orderResponse => set({ orderResponse }),
});

// TODO use `checkoutItems` state for optimistic UI && guest checkout
export default createCheckoutSlice;
