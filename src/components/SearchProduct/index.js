import React, { useEffect, useState } from "react";

import "./searchProduct.css";
import { FiX, FiArrowUp } from "react-icons/fi";

import { useSelector, useDispatch } from "react-redux";
import { productsSelectors } from "../../selectors/products";
import { filterProducts, onInputChange } from "../../actions/products";
import { Link } from "react-router-dom";
import { modalsActions } from "../../actions/modals";
import useDebounce from "../../services/useDebounce";

export default function SearchProduct({ id = "modal", showSearch, products }) {
  const filteredItems = useSelector(productsSelectors.getFilteredItems);
  let searchName = useSelector(productsSelectors.getSearchNameValue);

  const [isSearching, setIsSearching] = useState(false);

  const dispatch = useDispatch();

  const handleOutsideClick = (e) => {
    if (e.target.id === id) dispatch(modalsActions.handleCloseSearch());
  };

  const debouncedSearchTerm = useDebounce(searchName, 300);

  const onChange = (searchName) => {
    dispatch(onInputChange(searchName));
  };

  useEffect(() => {
    if (searchName !== "" && filteredItems.length === 0) {
      setIsSearching(true);
    }

    if (debouncedSearchTerm) {
      setTimeout(() => {
        dispatch(filterProducts(products, debouncedSearchTerm));
        setIsSearching(false);
      }, 300);
    } else if (debouncedSearchTerm === "") {
      dispatch(filterProducts([], ""));
    }
  }, [
    debouncedSearchTerm,
    dispatch,
    filteredItems.length,
    products,
    searchName,
  ]);

  const linkToTop = document.getElementById("link-top-search");
  const modalContent = document.getElementById("search-content");

  if (showSearch) {
    modalContent.onscroll = () => {
      if (modalContent.scrollTop > 20) {
        linkToTop.classList.add("move-to-top--visible");

        linkToTop.addEventListener("click", (event) => {
          event.preventDefault();
          modalContent.scroll({
            top: 0,
            behavior: "smooth",
          });
        });
      } else {
        linkToTop.classList.remove("move-to-top--visible");
      }
    };
  }

  return (
    <div
      id={id}
      className={showSearch ? "modal" : "modal modal--hide"}
      onClick={handleOutsideClick}
    >
      <div className="title">
        Buscar Produtos
        <FiX
          className="icon icon--close-modal"
          onClick={() => dispatch(modalsActions.handleCloseSearch())}
        />
      </div>
      <div className="title__form">
        <input
          className="title__input"
          value={searchName}
          onChange={(e) => onChange(e.target.value)}
          type="text"
          placeholder="Pesquise pelo produto..."
        />
        {searchName && (
          <>
            <FiX
              onClick={() => dispatch(onInputChange(""))}
              className="icon icon--clear-text"
            />
            <span className="msg msg--items-found">
              itens: {filteredItems.length}
            </span>
          </>
        )}
      </div>
      <div className="modal__container">
        <div id="search-content" className="modal__content">
          <div id="search" className="search-modal">
            {filteredItems.length === 0 && !isSearching && (
              <span className="msg msg--not-found">
                Nenhum resultado encontrado !
              </span>
            )}
            {isSearching && (
              <span className="msg msg--searching">Pesquisando...</span>
            )}

            {filteredItems.map((item) => {
              return (
                <React.Fragment key={item.id}>
                  <div className="search-product">
                    <figure
                      onClick={() =>
                        dispatch(modalsActions.handleCloseSearch())
                      }
                      className="search-product__poster"
                    >
                      {!item.image ? (
                        <Link to={`/products/${item.id}`}>
                          <img
                            className="search-product__img search-product__img--null"
                            src={
                              "https://via.placeholder.com/470x594/FFFFFF/?text=Imagem+Indisponível"
                            }
                            alt="img null"
                          />
                        </Link>
                      ) : (
                        <Link to={`/products/${item.id}`}>
                          <img
                            className="search-product__img"
                            src={item.image}
                            alt="img"
                          />
                        </Link>
                      )}
                    </figure>
                    <section className="search-product__description">
                      <span className="search-product__name">{item.name}</span>
                      <div className="search-product__pricing">
                        <span className="search-product__parcel-price">
                          Em até {item.installments}
                        </span>
                        <span className="search-product__price">
                          {item.actual_price}
                        </span>
                      </div>
                    </section>
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>
      <Link
        title="Ir para o topo"
        id="link-top-search"
        className="move-to-top"
        to="#top"
      >
        <FiArrowUp className="icon icon--move-to-top" />
      </Link>
    </div>
  );
}
