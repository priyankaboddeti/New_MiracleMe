// api/hubbleApi.js
import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./apiBase";
import { API_ENDPOINTS } from "./apiEndpoints";
import { encryptString, decryptString } from "../utils/encryption";
import { decodeJwt, createEncryptedUrl } from "../utils/apiUtils";

export const HubbleApi = createApi({
  reducerPath: "api",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    hubbleLogin: builder.mutation({
      query: (credentials) => {
        const encryptedCredentials = {
          loginId: encryptString(credentials.username),
          password: encryptString(credentials.password),
        };
        const payload = {
          data: encryptString(JSON.stringify(encryptedCredentials)),
        };
        return {
          url: createEncryptedUrl(API_ENDPOINTS.AUTH.LOGIN),
          method: "POST",
          body: payload,
          headers: {
            "Content-Type": "application/json",
          },
        };
      },
      transformResponse: (res) => {
        if (!res?.data) {
          console.error("❌ Invalid response format:", res);
          return { success: false, message: "Invalid response format" };
        }
        try {
          const response = JSON.parse(decryptString(res.data));
          if (response?.success && response?.token) {
            const decodedToken = decodeJwt(response.token);
            return decodedToken
              ? { ...response, decodedToken }
              : { ...response, decodeError: "Invalid JWT" };
          }
          return response;
        } catch (error) {
          console.error("❌ Error transforming response:", error);
          return { success: false, message: "Error transforming response" };
        }
      },
      transformErrorResponse: (error) => error?.data || "Something went wrong!",
    }),

    getUserProfile: builder.query({
      query: () => ({
        url: createEncryptedUrl(API_ENDPOINTS.USER.PROFILE),
        method: "GET",
      }),
      transformResponse: (res) => {
        if (!res?.data) {
          console.error("❌ Invalid profile response format:", res);
          return { success: false, message: "Invalid profile response format" };
        }
        try {
          return JSON.parse(decryptString(res.data));
        } catch (error) {
          console.error("❌ Error transforming profile response:", error);
          return {
            success: false,
            message: "Error transforming profile response",
          };
        }
      },
    }),

    // ... other endpoints
  }),
});

export const { useHubbleLoginMutation, useGetUserProfileQuery } = HubbleApi;
