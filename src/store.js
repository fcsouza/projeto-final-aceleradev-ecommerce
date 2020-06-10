import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { reducers } from "./reducers";
import { saveState, loadState } from "./services/stores";

const persistedState = loadState();

const store = createStore(reducers, persistedState, applyMiddleware(thunk));

store.subscribe(() => {
  saveState({
    cartProductsReducers: store.getState().cartProductsReducers,
  });
});

export { store };
