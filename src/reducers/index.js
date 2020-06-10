//esse counterReducers é o apelido que estamos atribuindo ao reducer do counter, que é o nosso estado global que iremos manipular

import { combineReducers } from "redux"; //resposável por unir os reducers para que tenha o acesso global, nesse caso nós so temois um, que é o counter

import { productsReducers } from "./products";
import { cartProductsReducers } from "./cartProducts";
import { modalsReducers } from "./modals"
// ou import {reducers as getProduct } from "./products" , caso tivessemos outro reducer

const reducers = combineReducers({
  productsReducers,
  cartProductsReducers,
  modalsReducers
});

export { reducers };
