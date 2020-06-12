import { actionsTypes } from "../constants/cartProducts";

export const addItemToCart = (product, size) => {
  return (dispatch, getState) => {
    const { cartProducts } = getState().cartProductsReducers;
    const cartId =
      cartProducts.length > 0
        ? cartProducts[cartProducts.length - 1].cartId + 1
        : 0;

    const cartIndex = cartProducts.findIndex(
      (item) => item.product.name === product.name && item.selectedSize === size
    );
    let id = 0;
    if (cartIndex >= 0) id = cartProducts[cartIndex].cartId;

    dispatch({
      type: actionsTypes.ADD_TO_CART,
      payload: {
        cartId: cartId,
        product: product,
        selectedSize: size,
      },
      id: id,
      cartIndex: cartIndex,
    });
  };
};

const actions = {
  incrementCount: (cartId) => ({
    type: actionsTypes.INCREMENT_COUNT_CART_ITEM,
    payload: {
      cartId: cartId,
    },
  }),
  decrementCount: (cartId) => ({
    type: actionsTypes.DECREMENT_COUNT_CART_ITEM,
    payload: {
      cartId: cartId,
    },
  }),
  removeItemFromCart: (cartId) => ({
    type: actionsTypes.REMOVE_FROM_CART,
    payload: {
      cartId: cartId,
    },
  }),
};

export { actions };
