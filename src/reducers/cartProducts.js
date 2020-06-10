import { actionsTypes } from "../constants/cartProducts";

const INITIAL_STATE = {
  cartProducts: [],
};

const cartItem = (state, action) => {
  switch (action.type) {
    case actionsTypes.ADD_TO_CART:
      if (action.cartIndex === -1) {
        return {
          cartId: action.payload.cartId,
          product: action.payload.product,
          selectedSize: action.payload.selectedSize,
          qty: 1,
        };
      }
      if (action.id === state.cartId) {
        return {
          ...state,
          qty: state.qty + 1,
        };
      }
      return state;
    case actionsTypes.REMOVE_FROM_CART:
      return state.cartId !== action.payload.cartId;
    case actionsTypes.INCREMENT_COUNT_CART_ITEM:
      if (state.cartId !== action.payload.cartId) {
        return state;
      }
      return {
        ...state,
        qty: state.qty + 1,
      };
    case actionsTypes.DECREMENT_COUNT_CART_ITEM:
      if (state.cartId !== action.payload.cartId) {
        return state;
      }
      return {
        ...state,
        qty: state.qty - 1,
      };
    default:
      return state;
  }
};

const cartProductsReducers = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionsTypes.ADD_TO_CART:
      if (action.cartIndex === -1) {
        return {
          cartProducts: [...state.cartProducts, cartItem(state, action)],
        };
      }
      return {
        cartProducts: state.cartProducts.map((item) => cartItem(item, action)),
      };
    case actionsTypes.REMOVE_FROM_CART:
      return {
        cartProducts: state.cartProducts.filter((item) =>
          cartItem(item, action)
        ),
      };
    case actionsTypes.INCREMENT_COUNT_CART_ITEM:
      return {
        cartProducts: state.cartProducts.map((item) => cartItem(item, action)),
      };

    case actionsTypes.DECREMENT_COUNT_CART_ITEM:
      return {
        cartProducts: state.cartProducts.map((item) => {
          return item.qty > 1 ? cartItem(item, action) : item;
        }),
      };

    default:
      return state;
  }
};

export { cartProductsReducers };

