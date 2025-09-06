import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:3001";

export const signUp = createAsyncThunk(
  "auth/createUser",
  async function (userData, { rejectWithValue }) {
    try {
      const { data } = await axios.get(`${BASE_URL}/users`);
      const finded = data.find(
        (item) =>
          item.email === userData.email && item.password === userData.password
      );

      if (finded) {
        const message = "Такой пользователь уже существует";
        alert(message);
        throw new Error(message);
      }

      const createdUser = await axios.post(`${BASE_URL}/users`, {
        ...userData,
        role: "user",
        cart: [],
      });

      localStorage.setItem("user-data", JSON.stringify(createdUser.data));
      return createdUser.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const signIn = createAsyncThunk(
  "auth/login",
  async function (userData, { rejectWithValue }) {
    try {
      const { data } = await axios.get(`${BASE_URL}/users`);
      const finded = data.find(
        (item) =>
          item.email === userData.email && item.password === userData.password
      );

      if (!finded) {
        const message = "Такой пользователь не найден";
        alert(message);
        throw new Error(message);
      }

      localStorage.setItem("user-data", JSON.stringify(finded));
      return finded;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addProductToCart = createAsyncThunk(
  "auth/addProductToCart",
  async function (requestData, { rejectWithValue }) {
    try {
      const { data, status } = await axios.patch(
        `${BASE_URL}/users/${requestData.id}`,
        {
          cart: requestData.cart,
        }
      );

      if (status === 200) {
        localStorage.setItem("user-data", JSON.stringify(data));
        return data;
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getProducts = createAsyncThunk(
  "product/getProducts",
  async function (params = {}, { rejectWithValue }) {
    try {
      const { data, headers } = await axios.get(`${BASE_URL}/products`, {
        params,
      });
      return {
        total: headers.get("x-total-count"),
        results: data,
      };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const createProduct = createAsyncThunk(
  "product/createProduct",
  async function (productData, { rejectWithValue }) {
    try {
      const { data } = await axios.post(`${BASE_URL}/products`, {
        ...productData,
      });

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const editProduct = createAsyncThunk(
  "product/editProduct",
  async function (productData, { rejectWithValue }) {
    try {
      const { data } = await axios.patch(
        `${BASE_URL}/products/${productData.id}`,
        {
          ...productData,
        }
      );

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async function (id, { rejectWithValue }) {
    try {
      const { data } = await axios.delete(`${BASE_URL}/products/${id}`);

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getCategories = createAsyncThunk(
  "categories/getCategories",
  async function (params = {}, { rejectWithValue }) {
    try {
      const { data } = await axios.get(`${BASE_URL}/categories`, { params });
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
