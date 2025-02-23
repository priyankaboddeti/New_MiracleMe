import { createSlice } from "@reduxjs/toolkit";
import * as SecureStore from 'expo-secure-store';

const initialState = {
  isSignin: false,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signIn: (state, action) => {
      state.isSignin = true;
      state.token = action.payload;
      // 🔹 Store token securely
      SecureStore.setItemAsync("token", action.payload); // Store token
    },
    signOut: (state) => {
      state.isSignin = false;
      state.token = null;
       // 🔹 Remove token securely
       SecureStore.deleteItemAsync("token"); // Remove token
    },
  },
});

export const { signIn, signOut } = authSlice.actions;
export default authSlice.reducer;
