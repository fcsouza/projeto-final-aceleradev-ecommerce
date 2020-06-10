const modalsSelectors = {
  getCartModalState: (state) => state.modalsReducers.showCart,
  getSearchModalState: (state) => state.modalsReducers.showSearch,
  getImgModalState: (state) => state.modalsReducers.showImg,
};

export { modalsSelectors };
