import { actionsTypes } from "../constants/modals";

const modalsActions = {
  handleShowCart: () => ({
    type: actionsTypes.SHOW_CART_MODAL,
  }),
  handleCloseCart: () => ({
    type: actionsTypes.CLOSE_CART_MODAL,
  }),
  handleShowSearch: () => ({
    type: actionsTypes.SHOW_SEARCH_MODAL,
  }),
  handleCloseSearch: () => ({
    type: actionsTypes.CLOSE_SEARCH_MODAL,
  }),
  handleShowImg: () => ({
    type: actionsTypes.SHOW_IMG_MODAL,
  }),
  handleCloseImg: () => ({
    type: actionsTypes.CLOSE_IMG_MODAL,
  }),
};

export { modalsActions };
