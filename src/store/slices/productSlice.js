import { createSlice } from "@reduxjs/toolkit";

import { getProducts } from "../actions/actions";

const initialState = {
  products: [],
  total: 0,
  singleProduct: null,
  productsLoading: false,
  error: null,
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state) => {
      state.productsLoading = true;
    });
    builder.addCase(getProducts.fulfilled, (state, { payload }) => {
      state.productsLoading = false;
      state.products = payload.results;
      state.total = payload.total;
    });
    builder.addCase(getProducts.rejected, (state, { payload }) => {
      state.productsLoading = false;
      state.error = payload;
    });
  },
});
