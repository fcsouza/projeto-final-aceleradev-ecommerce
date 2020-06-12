import React from "react";
import { FiSearch, FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";

import "./header.css";
import { useDispatch } from "react-redux";
import { modalsActions } from "../../actions/modals";

export default function Header({ cartProductsCounter, showAddCartAlert }) {
  const dispatch = useDispatch();
  return (
    <div className="header">
      <div className="header__content">
      <>
        <Link className="link link--home" to="/">
          Fashionista
        </Link>
        <div className="header__icons">
          <FiSearch
            className="icon icon--search"
            onClick={() => dispatch(modalsActions.handleShowSearch())}
          />
          <FiShoppingCart
            className="icon icon--cart"
            onClick={() => dispatch(modalsActions.handleShowCart())}
          />
          <div
            onClick={() => dispatch(modalsActions.handleShowCart())}
            className={
              showAddCartAlert
                ? "cart-counter cart-counter--active"
                : "cart-counter"
            }
            style={{ display: cartProductsCounter === 0 && "none" }}
          >
            <span>{cartProductsCounter}</span>
          </div>
        </div>
      </>
      </div>
    </div>
  );
}
