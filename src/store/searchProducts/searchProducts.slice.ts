import { createSlice } from "@reduxjs/toolkit";

const initialState = { value: "" };

export const searchProductsSlice = createSlice({
  name: "searchProducts",
  initialState,

  reducers: {
    updatedInputValue: (state, { payload: inputValue }) => {
      state.value = inputValue;
    },
    resetInputValue: (state) => {
      if (state.value) {
        state.value = "";
      }
    },
  },
});

export const { actions, reducer } = searchProductsSlice;
