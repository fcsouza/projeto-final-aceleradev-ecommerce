import { actionsTypes } from "../constants/modals";

const INITIAL_STATE = {
  showCart: false,
  showSearch: false,
  showImg: false,
};

const modalsReducers = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionsTypes.SHOW_CART_MODAL:
      return {
        showCart: true,
      };
    case actionsTypes.CLOSE_CART_MODAL:
      return {
        showCart: false,
      };
    case actionsTypes.SHOW_SEARCH_MODAL:
      return {
        showSearch: true,
      };
    case actionsTypes.CLOSE_SEARCH_MODAL:
      return {
        showSearch: false,
      };
    case actionsTypes.SHOW_IMG_MODAL:
      return {
        showImg: true,
      };
    case actionsTypes.CLOSE_IMG_MODAL:
      return {
        showImg: false,
      };
    default:
      return state;
  }
};

export { modalsReducers };
