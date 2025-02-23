import * as SecureStore from 'expo-secure-store';
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL, API_ENDPOINTS } from "./apiEndpoints";
import {encryptString,decryptString} from "../utils/encryption"

// Function to retrieve auth token
const prepareHeaders = async (headers) => {
  const token = await SecureStore.getItemAsync("authToken");
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }
  return headers;
};

// 🔹 Create API service
export const HubbleApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders, // Attach token to requests
  }),
  endpoints: (builder) => ({
    // ========================== AUTH SCREEN ==========================
    hubbleLogin: builder.mutation({
        query: (credentials) => {
            // Encrypt username and password before sending the request
            const encryptedCredentials = {
              loginId: encryptString(credentials.username),
              password: encryptString(credentials.password),
            };
          console.log(credentials.username);
          
          console.log(encryptedCredentials,"encryptedCredentials")
            return {
              url: "/employee/login",
              method: "POST",
              body: encryptedCredentials,
              headers: { "Content-Type": "application/json","Accept-Charset": "UTF-8"  },
            };
          },
          transformResponse: (response) => {
            // Decrypt token if necessary (example)
            console.log(response,"response")
            if (response.success) {
                // return {
                //   ...response,
                //   token: decryptString(response.token),
                // };
                return response;
              }
              
          },
      transformErrorResponse: (error) => error.data || "Something went wrong!", // Handle errors
    }),
  }),
});

// 🔹 Export Hooks
export const { useHubbleLoginMutation } = HubbleApi;

