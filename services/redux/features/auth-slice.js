import { createSlice } from "@reduxjs/toolkit";
import * as SecureStore from "expo-secure-store";

const initialState = {
  isSignIn: false,
  jwtToken: null,
  decodedJwtToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signIn: (state, action) => {
      const { jwtToken, decodedJwtToken } = action.payload;

      state.isSignIn = true;
      state.jwtToken = jwtToken;
      state.decodedJwtToken = decodedJwtToken;

      // Store token securely
      SecureStore.setItemAsync("encryptedToken", String(jwtToken))
        .then(() => console.log("✅ encryptedToken stored successfully"))
        .catch((error) =>
          console.error("❌ SecureStore Error storing encryptedToken:", error)
        );

      SecureStore.setItemAsync("decodedToken", JSON.stringify(decodedJwtToken))
        .then(() => console.log("✅ decodedToken stored successfully"))
        .catch((error) =>
          console.error("❌ SecureStore Error storing decodedToken:", error)
        );
    },
    signOut: (state) => {
      state.isSignIn = false;
      state.jwtToken = null;
      state.decodedJwtToken = null;

      // 🔹 Remove all data
      console.log("🔑 Clearing all secure auth-related data from SecureStore");
      const secureKeys = [
        "encryptedToken",
        "decodedToken",
        "mpin",
        "refreshToken",
        "biometricEnabled",
        "userProfile",
        "loginTimestamp",
      ];

      secureKeys.forEach((key) => {
        SecureStore.deleteItemAsync(key).catch((error) =>
          console.error(`SecureStore Error deleting ${key}:`, error)
        );
      });
    },
    updateSignInStatus: (state, action) => {
      state.isSignIn = action.payload; // true or false
    },
  },
});

export const { signIn, signOut, updateSignInStatus } = authSlice.actions;
export default authSlice.reducer;
