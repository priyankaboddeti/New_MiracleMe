import * as SecureStore from "expo-secure-store";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL, API_ENDPOINTS } from "./apiEndpoints";
import { encryptString, decryptString } from "../utils/encryption";

// decode jwt token
function decodeJwt(token) {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) {
      throw new Error("Invalid JWT format");
    }

    const payload = JSON.parse(decodeBase64(parts[1]));
    return payload;
  } catch (error) {
    console.error("JWT decoding error:", error);
    return null;
  }
}

function decodeBase64(base64) {
  if (typeof atob !== "undefined") {
    return atob(base64.replace(/-/g, "+").replace(/_/g, "/"));
  } else {
    return Buffer.from(base64, "base64").toString("utf-8");
  }
}

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
        const encryptedPayload = {
          data: encryptString(JSON.stringify(encryptedCredentials)),
        };
        return {
          url: encryptString(API_ENDPOINTS.AUTH.LOGIN),
          method: "POST",
          body: JSON.stringify(encryptedPayload),
          headers: {
            "Content-Type": "application/json",
          },
        };
      },
      transformResponse: (res) => {
        console.log("🟢 Raw API Response:", res); // Debugging
        const response = JSON.parse(decryptString(res.data));
        if (response.success && response.token) {
          const decodedToken = decodeJwt(response.token);
          const newResponse = decodedToken
            ? { ...response, decodedToken }
            : { ...response, decodeError: "Invalid JWT" };

          console.log("✅ Transformed Response:", newResponse);
          return newResponse;
        }

        console.log(
          "⚠️ Response didn't match expected format, returning as is:",
          response
        );
        return response; // Return original response if it doesn't match expected conditions
      },

      transformErrorResponse: (error) => error.data || "Something went wrong!", // Handle errors
    }),
  }),
});

// 🔹 Export Hooks
export const { useHubbleLoginMutation } = HubbleApi;
