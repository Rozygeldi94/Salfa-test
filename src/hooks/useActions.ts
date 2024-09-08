import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { actions as productsActions } from "../store/products/dummyjson.com_slice";
import { actions as searchProductsActions } from "../store/searchProducts/searchProducts.slice";

import { bindActionCreators } from "@reduxjs/toolkit";

const rootActions = {
  ...productsActions,
  ...searchProductsActions,
};

export const useActions = () => {
  const dispatch = useDispatch();
  return useMemo(() => {
    return bindActionCreators(rootActions, dispatch);
  }, [dispatch]);
};
