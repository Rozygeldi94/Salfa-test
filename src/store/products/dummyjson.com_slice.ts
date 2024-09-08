import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IProduct } from "@/types/product.types";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    try {
      const productsURL = "https://dummyjson.com/products?limit=0";
      const response = await fetch(productsURL);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data.products as IProduct[];
    } catch (error) {
      console.error("Error fetching products:", error);
      return [];
    }
  }
);

export interface ISidebarFilter {
  category: (string | number)[];
  brand: (string | number)[];
  price: string;
}

interface IProductState {
  products: IProduct[];
  originalProducts: IProduct[];
  sidebarFilter: ISidebarFilter;
  isSidebarActive: boolean;
  loading: boolean;
  error: string;
}

const initialState: IProductState = {
  products: [],
  originalProducts: [],
  sidebarFilter: { category: [], brand: [], price: "" },
  isSidebarActive: false,
  loading: false,
  error: "",
};

const productsSlice = createSlice({
  name: "productsSlice",
  initialState,
  reducers: {
    setCategoryValue: (state, { payload }) => {
      if (payload) {
        state.sidebarFilter = {
          ...state.sidebarFilter,
          category: payload,
        };
      }
    },
    setBrandValue: (state, { payload }) => {
      if (payload) {
        state.sidebarFilter = {
          ...state.sidebarFilter,
          brand: payload,
        };
      }
    },
    setPriceValue: (state, { payload }) => {
      if (payload) {
        state.sidebarFilter = {
          ...state.sidebarFilter,
          price: payload,
        };
      }
    },
    setSidebarActive: (state, { payload }) => {
      state.isSidebarActive = payload;
    },
    resetSidebarValues: (state) => {
      state.sidebarFilter = {
        ...state.sidebarFilter,
        category: [],
        brand: [],
        price: "",
      };
    },
    productLike: (state, { payload }) => {
      const toggleLike = (product: IProduct) =>
        product.id === payload
          ? { ...product, isLiked: product.isLiked ? !product.isLiked : true }
          : product;

      state.products = state.products.map(toggleLike);
      state.originalProducts = state.originalProducts.map(toggleLike);
    },
    removeProduct: (state, { payload }) => {
      state.products = state.products?.filter((el) => el?.id !== payload);
      state.originalProducts = state.originalProducts?.filter(
        (el) => el?.id !== payload
      );
    },
    selectFavoriteProducts: (state, { payload }) => {
      if (payload === "favorites") {
        state.products = state.products?.filter((el) => el.isLiked);
      } else {
        state.products = [...state.originalProducts];
      }
    },
    createProduct: (state, { payload }) => {
      state.products = [...state.products, payload];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.products = [];
        state.originalProducts = [];
        state.loading = true;
      })
      .addCase(
        fetchProducts.fulfilled,
        (state, { payload }: PayloadAction<IProduct[]>) => {
          state.products = payload;
          state.originalProducts = payload;
          state.loading = false;
        }
      )
      .addCase(fetchProducts.rejected, (state) => {
        state.products = [];
        state.originalProducts = [];
        state.loading = false;
      });
  },
});
export const { actions, reducer } = productsSlice;
