import { configureStore } from "@reduxjs/toolkit";
import { HubbleApi } from "../hubbleApi"; // Import the API service
import authSlice from "./features/auth-slice";
import fingerprintAuthSlice from "./features/fingerprintAuth-slice";
import { setupTokenRefresh } from "../tokenRefresher";

// Create the store
export const store = configureStore({
  reducer: {
    auth: authSlice,
    fingerprintAuth: fingerprintAuthSlice, // Register the fingerprint auth slice
    [HubbleApi.reducerPath]: HubbleApi.reducer, // Register the API reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(HubbleApi.middleware), // Add RTK Query middleware
});

// Set up token refresh after store is created
const { setupTokenRefreshTimer, createTokenRefreshMiddleware } =
  setupTokenRefresh(store);

// Export the token refresh timer setup function
export const initializeTokenRefresh = () => {
  return setupTokenRefreshTimer();
};

export default store;
