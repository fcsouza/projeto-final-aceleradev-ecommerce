import { actionsTypes } from "../constants/products";

const INITIAL_STATE = {
  products: [],
  loading: true,
  error: "",
  filteredItems: [],
  name: "",
  selectedSize: "",
};

const productsReducers = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionsTypes.PRODUCTS_FETCH_LOADING: {
      return {
        ...state,
        loading: true,
        error: "",
      };
    }
    case actionsTypes.PRODUCTS_FETCH_SUCESS: {
      return {
        ...state,
        products: action.payload.map((item, index) => {
          return {
            id: index,
            ...item,
          };
        }),
        loading: false,
      };
    }
    case actionsTypes.PRODUCTS_FETCH_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    }
    case actionsTypes.PRODUCTS_FILTER_BY_NAME: {
      return {
        ...state,
        filteredItems: action.payload.items,
      };
    }
    case actionsTypes.PRODUCTS_CHANGE_SEARCH_NAME: {
      return {
        ...state,
        name: action.payload.searchName,
      };
    }
    case actionsTypes.PRODUCTS_SELECTED_SIZE: {
      return {
        ...state,
        selectedSize: action.payload.size,
      };
    }
    default:
      return state;
  }
};

export { productsReducers };
