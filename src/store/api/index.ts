import { IProduct } from "@/types/product.types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const PRODUCTS_API_URL = "https://dummyjson.com";

export const productsApi = createApi({
  reducerPath: "productsApi",
  tagTypes: ["products"],
  baseQuery: fetchBaseQuery({ baseUrl: PRODUCTS_API_URL }),
  endpoints: (builder) => ({
    getProductById: builder.query<IProduct, string>({
      query: (id) => `/products/${id}`,
      providesTags: () => [{ type: "products" }],
    }),
    getProductsByTitle: builder.query({
      query: (title) => `/products/search?q=${title}&limit=100`,
      providesTags: () => [{ type: "products" }],
    }),
  }),
});

export const { useGetProductByIdQuery, useGetProductsByTitleQuery } =
  productsApi;
