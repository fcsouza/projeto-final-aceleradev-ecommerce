import { actionsTypes } from "../constants/products";
import api from "../services/api";

export const fetchProducts = () => {
  return (dispatch) => {
    dispatch({ type: actionsTypes.PRODUCTS_FETCH_LOADING });
    setTimeout(() => {
      api().then(
        (response) =>
          dispatch({
            type: actionsTypes.PRODUCTS_FETCH_SUCESS,
            payload: response.data, // aqui é onde eu "escolho" qual objeto eu quero pegar da resposta da api
          }),
        (error) =>
          dispatch({
            type: actionsTypes.PRODUCTS_FETCH_ERROR,
            error: error.messages || "Unexpected Error!",
          })
      );
    }, 300);
  };
};

export const onInputChange = (searchName) => {
  return (dispatch) => {
    dispatch({
      type: actionsTypes.PRODUCTS_CHANGE_SEARCH_NAME,
      payload: {
        searchName: searchName,
      },
    });
  };
};

export const filterProducts = (products, name) => {
  return (dispatch) => {
    dispatch({
      type: actionsTypes.PRODUCTS_FILTER_BY_NAME,
      payload: {
        items: products.filter(
          (item) =>
            item.name
              .toLowerCase()
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
              .indexOf(name.toLowerCase()) >= 0
        ),
      },
    });
  };
};

export const onSelectSize = (size) => {
  return (dispatch) => {
    dispatch({
      type: actionsTypes.PRODUCTS_SELECTED_SIZE,
      payload: {
        size: size,
      },
    });
  };
};

/*import { actionsTypes } from "../constants/products";
import { fetchProducts } from "../services/api";

const productsActions = {
  getProducts: (data) => {
    return {
      type: actionsTypes.PRODUCTS_FETCH_SUCESS,
      payload: {
        data: data
      },
    };
  },
};

export { productsActions };*/
