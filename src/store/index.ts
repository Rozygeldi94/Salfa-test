import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";
import { productsApi } from "./api";
import { reducer as productsReducer } from "./products/dummyjson.com_slice";
import { reducer as searchProductsReducer } from "./searchProducts/searchProducts.slice";

const reducers = combineReducers({
  [productsApi.reducerPath]: productsApi.reducer,
  products: productsReducer,
  searchProducts: searchProductsReducer,
});

const logger = createLogger({ collapsed: true });

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware).concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;
