import { configureStore } from "@reduxjs/toolkit";
import { HubbleApi } from "../apiService"; // Import the API service
import authSlice from "./features/auth-slice"

export const store = configureStore({
  reducer: {
    auth: authSlice,
    [HubbleApi.reducerPath]: HubbleApi.reducer, // Register the API reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(HubbleApi.middleware), // Add RTK Query middleware
});

export default store;
