import React from "react";

import { BrowserRouter, Route, Switch } from "react-router-dom";

import Home from "./pages/Home";
import Product from "./pages/Product";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchProducts } from "./actions/products";

export default function Routes() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/products/:id" component={Product} />
      </Switch>
    </BrowserRouter>
  );
}
