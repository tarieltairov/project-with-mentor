import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuth: false,
  token: "",
  user: {
    role: "user",
    username: "",
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuth = true;
      state.token = action.payload.accessToken;
      state.user.username = action.payload.username;
      localStorage.setItem("token", action.payload.accessToken);
    },
    logout: (state) => {
      state.isAuth = false;
      state.token = "";
      state.user = null;
      localStorage.removeItem("token");
    },
  },
});

export const { login, logout } = authSlice.actions;
