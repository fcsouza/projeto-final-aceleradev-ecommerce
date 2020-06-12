import React from "react";

import { actions } from "../../actions/counter";
import { useSelector, useDispatch } from "react-redux";
import { selectors } from "../../selectors/counter";
import { productsSelectors } from "../../selectors/products";
import { fetchProducts } from "../../actions/products";

const CartCounter = () => {
  let counter = useSelector(selectors.getCounter);
  const products = useSelector(productsSelectors.getProducts);
  const loading = useSelector(productsSelectors.loading);
  const error = useSelector(productsSelectors.error);
  const dispatch = useDispatch();

  const handleIncrement = () => {
    counter++;
    dispatch(actions.increment(counter));
  };
  const handleDecrement = () => {
    counter--;
    dispatch(actions.decrement(counter));
  };
  return (
    <>
      <h3>Qtd de produtos: {products.length}</h3>
      {loading && <h2>Loading...</h2>}
      {products &&
        products.map((product) => (
          <span key={product.id}>{product.name}</span>
        ))}
      {error && <span>Erro na requisição: {error}</span>}

      <span>Counter: {counter}</span>

      <button onClick={() => dispatch(fetchProducts())}>Listar Produtos</button>
      <button onClick={handleIncrement}>add to cart</button>
      <button onClick={handleDecrement}>remove from cart</button>
    </>
  );
};

export default CartCounter;

/*
PARA POPULAR O ESTADO DE PRODUCTS AO RENDERIZAR O COMPONENTE:
useEffect(() => {
    fetchProducts().then((resp) => dispatch(productsActions.getProducts(resp)));
  }, [dispatch]);*/

/*
// FORMAA ANTIGA DE USAR REDUX
import React from "react";

import { actions } from "../../actions/counter";
import { connect } from "react-redux";

// nas props do component eu coloco o que eu espero receber do estado global, nesse caso eu quero exibir o counter e manipular ele atravez
// das actions de incrementar e decrementar

const CartCounter = ({ counter, increment, decrement }) => (
  <>
    <span>items: {counter}</span>
    <button onClick={increment}>add to cart</button>
    <button onClick={decrement}>remove from cart</button>
  </>
);

const mapStateToProps = (state) => ({
  //pegando o estado que irei manipular a partir deste componente
  counter: state.counterReducers.counter,
});

const mapDispatchToProps = (dispatch) => ({
  //pegando as ações que irei realizar no estado a partir deste componente
  decrement: () => dispatch(actions.decrement()),
  increment: () => dispatch(actions.increment()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartCounter); //recebe um componente e devolve um componente "novo"
*/
