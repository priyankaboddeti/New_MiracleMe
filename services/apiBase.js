// api/apiBase.js
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getToken } from "../utils/apiUtils";
import { API_BASE_URL } from "./apiEndpoints";

const baseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  prepareHeaders: async (headers) => {
    const apiKey = process.env.EXPO_PUBLIC_API_KEY;
    if (apiKey) {
      headers.set("X-API-Key", apiKey);
    }
    const token = await getToken();
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    headers.set("Accept", "application/json");
    headers.set("Content-Type", "application/json");
    return headers;
  },
  fetchFn: async (url, ...rest) => {
    console.log("➡️ Request URL:", url);
    return fetch(url, ...rest);
  },
});

export default baseQuery;
