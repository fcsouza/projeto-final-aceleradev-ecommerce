import { createSelector } from "reselect";

const calculateTotal = createSelector(
  (state) => state.cartProductsReducers.cartProducts,
  (cartProducts) => {
    return cartProducts.reduce(
      (subtotal, item) =>
        subtotal +
        (parseInt(
          item.product.actual_price
            .split("")
            .filter((n) => Number(n))
            .join("")
        ) /
          10) *
          item.qty,
      0
    );
  }
);

const calculateCounter = createSelector(
  (state) => state.cartProductsReducers.cartProducts,
  (cartProducts) => {
    return cartProducts.reduce((counter, item) => counter + item.qty, 0);
  }
);

const cartProductsSelectors = {
  getCartProducts: (state) => state.cartProductsReducers.cartProducts,

  total: (state) => calculateTotal(state),

  cartProductsIsEmpty: (state) =>
    state.cartProductsReducers.cartProducts.length === 0 ? true : false,

  getCartCounter: (state) => calculateCounter(state),
};

export { cartProductsSelectors };
