import React, { useState, useEffect } from "react";
import Header from "../../components/Header";

import "./product.css";
import { FiArrowLeft, FiX } from "react-icons/fi";

import { Link } from "react-router-dom";
import ImgModal from "../../components/ImgModal";
import SearchProduct from "../../components/SearchProduct";
import CartModal from "../../components/CartModal";
import { useSelector, useDispatch } from "react-redux";
import { cartProductsSelectors } from "../../selectors/cartProducts";
import { addItemToCart } from "../../actions/cartProducts";
import { productsSelectors } from "../../selectors/products";
import { onSelectSize } from "../../actions/products";
import { modalsSelectors } from "../../selectors/modals";
import { modalsActions } from "../../actions/modals";

export default function Product(props) {
  const [showAddCartAlert, setShowAddCartAlert] = useState(false);
  const [showNoSizeSelectedAlert, setShowNoSizeSelectedAlert] = useState(false);

  let [id, setId] = useState(Number);

  const cartProducts = useSelector(cartProductsSelectors.getCartProducts);
  const products = useSelector(productsSelectors.getProducts);
  const loading = useSelector(productsSelectors.loading);
  const selectedSize = useSelector(productsSelectors.getSelectedSize);
  const cartCounter = useSelector(cartProductsSelectors.getCartCounter);
  const showCart = useSelector(modalsSelectors.getCartModalState);
  const showSearch = useSelector(modalsSelectors.getSearchModalState);
  const showImg = useSelector(modalsSelectors.getImgModalState);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(onSelectSize(""));
    setId(parseInt(props.match.params.id));
  }, [dispatch, props.match.params.id]);

  const handleAddProductToCart = (product, size) => {
    if (size === "") {
      return setShowNoSizeSelectedAlert(true);
    }
    dispatch(addItemToCart(product, size));

    setShowAddCartAlert(true);

    const btn = document.getElementById("btn");
    btn.classList.add("touch");

    setTimeout(() => {
      btn.classList.remove("touch");
    }, 500);

    setTimeout(() => {
      setShowAddCartAlert(false);
    }, 800);
  };

  const handleSelectSize = (size) => {
    setShowAddCartAlert(false);
    setShowNoSizeSelectedAlert(false);
    dispatch(onSelectSize(size));
    let sizes = document.querySelectorAll(".btn-sizes");
    for (let value of sizes) {
      if (value.classList.contains("btn-sizes--selected"))
        value.classList.remove("btn-sizes--selected");
      if (value.innerHTML === size) value.classList.add("btn-sizes--selected");
    }
  };

  return (
    <div className="container">
      {loading ? (
        <div className="loading">
          <div className="loading__indeterminate"></div>
        </div>
      ) : (
        <>
          <Header
            cartProductsCounter={cartCounter}
            showAddCartAlert={showAddCartAlert}
          />
          {showCart && <div className="back-drop"></div>}
          <CartModal cartProducts={cartProducts} showCart={showCart} />
          {showSearch && <div className="back-drop"></div>}
          <SearchProduct products={products} showSearch={showSearch} />

          {showImg && <div className="back-drop"></div>}
          {products.map((item) => {
            if (item.id === id) {
              return (
                <ImgModal key={item.id} img={item.image} showImg={showImg} />
              );
            }
            return null;
          })}

          {products.map((item) => {
            if (item.id === id) {
              return (
                <div key={item.id} className="product">
                  <figure
                    onClick={() => dispatch(modalsActions.handleShowImg())}
                    className="product__poster"
                  >
                    {item.image ? (
                      <img
                        className="product__img"
                        src={item.image}
                        alt="Product"
                      />
                    ) : (
                      <img
                        className="product__img product__img--null"
                        src={
                          "https://via.placeholder.com/470x594/FFFFFF/?text=Imagem+Indisponível"
                        }
                        alt="Null"
                      />
                    )}
                  </figure>
                  <section className="product__description">
                    <strong className="product__name">{item.name}</strong>
                    <span className="product__price">{item.actual_price}</span>
                    <span className="product__price product__price--parcel">
                      Em até {item.installments}
                    </span>
                    <div className="product__sizes">
                      {item.sizes.map((size) => {
                        return (
                          size.available && (
                            <div className="product__size">
                              <button
                                key={size.sku}
                                onClick={() => handleSelectSize(size.size)}
                                className="btn-sizes btn-sizes--normal"
                              >
                                {size.size}
                              </button>
                            </div>
                          )
                        );
                      })}
                    </div>

                    <div
                      className={
                        showNoSizeSelectedAlert
                          ? "alert-danger"
                          : "alert-danger--hide"
                      }
                    >
                      <FiX
                        className="icon icon--close-alert"
                        onClick={() => setShowNoSizeSelectedAlert(false)}
                      />
                      Selecione um tamanho !
                    </div>

                    <button
                      id="btn"
                      className="btn btn--bag"
                      onClick={() => handleAddProductToCart(item, selectedSize)}
                    >
                      Adicionar ao carrinho
                    </button>
                    <Link className="link link--back" to="/">
                      <FiArrowLeft className="icon icon--back" />
                      Voltar para home
                    </Link>
                  </section>
                </div>
              );
            }
            return null;
          })}
        </>
      )}
    </div>
  );
}
