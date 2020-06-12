import React, { useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "./home.css";
import { Link } from "react-router-dom";
import { FiArrowUp } from "react-icons/fi";
import CartModal from "../../components/CartModal";
import SearchProduct from "../../components/SearchProduct";
import { useSelector } from "react-redux";
import { productsSelectors } from "../../selectors/products";
import { cartProductsSelectors } from "../../selectors/cartProducts";

import { modalsSelectors } from "../../selectors/modals";

export default function Home() {
  const cartCounter = useSelector(cartProductsSelectors.getCartCounter);
  const cartProducts = useSelector(cartProductsSelectors.getCartProducts);
  const products = useSelector(productsSelectors.getProducts);
  const loading = useSelector(productsSelectors.loading);
  const showCart = useSelector(modalsSelectors.getCartModalState);
  const showSearch = useSelector(modalsSelectors.getSearchModalState);

  useEffect(() => {
    const linkToTop = document.getElementById("link-top-home");
    window.onscroll = () => {
      if (
        document.body.scrollTop > 20 ||
        document.documentElement.scrollTop > 20
      ) {
        linkToTop.classList.add("move-to-top--visible");

        linkToTop.addEventListener("click", (event) => {
          event.preventDefault();
          window.scroll({
            top: 0,
            behavior: "smooth",
          });
        });
      } else if (linkToTop.classList.contains("move-to-top--visible")) {
        linkToTop.classList.remove("move-to-top--visible");
      }
    };
  }, []);

  return (
    <div className="container">
      {loading ? (
        <div className="loading">
          <div className="loading__indeterminate"></div>
        </div>
      ) : (
        <>
          <Header cartProductsCounter={cartCounter} showCart={showCart} />

          {showCart && <div className="back-drop"></div>}
          <CartModal cartProducts={cartProducts} showCart={showCart} />

          {showSearch && <div className="back-drop"></div>}
          <SearchProduct products={products} showSearch={showSearch} />
          <div className="content">
            <div className="catalog">
              <>
                <span className="catalog__counter">
                  {products.length} itens
                </span>
                <ul className="catalog__list">
                  {products.map((item) => (
                    <li key={item.id} className="catalog__item">
                      <Link to={`products/${item.id}`}>
                        <figure className="catalog__poster">
                          {!item.image ? (
                            <img
                              className="catalog__img catalog__img--null"
                              src={
                                "https://via.placeholder.com/470x594/FFFFFF/?text=Imagem+Indisponível"
                              }
                              alt="Null"
                            />
                          ) : (
                            <img
                              className="catalog__img"
                              src={item.image}
                              alt="product"
                            />
                          )}
                          <div className="catalog__seal">
                            {item.discount_percentage && (
                              <span>-{item.discount_percentage}</span>
                            )}
                          </div>
                        </figure>
                      </Link>
                      <div className="catalog__description">
                        <strong className="catalog__name">{item.name}</strong>
                        <div className="catalog__pricing">
                          {item.regular_price !== item.actual_price ? (
                            <>
                              <span className="catalog__price">
                                {item.regular_price}
                              </span>
                              <span className="catalog__price catalog__price--promo">
                                {item.actual_price}
                              </span>
                            </>
                          ) : (
                            <span className="catalog__price catalog__price--promo">
                              {item.regular_price}
                            </span>
                          )}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </>
            </div>
          </div>
          <Footer />
        </>
      )}

      <Link
        to="#"
        title="Ir para o topo"
        id="link-top-home"
        className="move-to-top"
      >
        <FiArrowUp className="icon icon--move-to-top" />
      </Link>
    </div>
  );
}
