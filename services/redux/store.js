import { configureStore } from "@reduxjs/toolkit";
import { HubbleApi } from "../apiService"; // Import the API service
import authSlice from "./features/auth-slice";
import fingerprintAuthSlice from "./features/fingerprintAuth-slice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    // pinAuth:pinAuthSlice,
    fingerprintAuth: fingerprintAuthSlice, // Register the fingerprint auth slice
    [HubbleApi.reducerPath]: HubbleApi.reducer, // Register the API reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(HubbleApi.middleware), // Add RTK Query middleware
});

export default store;
