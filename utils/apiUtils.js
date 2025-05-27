// utils/apiUtils.js
import * as SecureStore from "expo-secure-store";
import { API_BASE_URL } from "../services/apiEndpoints"; // Assuming API_BASE_URL is here
import { encryptString } from "./encryption"; // Assuming encryptString is here

export const safeBase64Decode = (base64) => {
  try {
    return typeof atob !== "undefined"
      ? atob(base64.replace(/-/g, "+").replace(/_/g, "/"))
      : Buffer.from(base64, "base64").toString("utf-8");
  } catch (error) {
    console.error("Base64 decoding error:", error);
    return null;
  }
};

export const decodeJwt = (token) => {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) {
      throw new Error("Invalid JWT format");
    }
    const payload = JSON.parse(safeBase64Decode(parts[1]));
    return payload;
  } catch (error) {
    console.error("JWT decoding error:", error);
    return null;
  }
};

export const createEncryptedUrl = (endpoint) => {
  const encryptedEndpoint = encryptString(endpoint);
  return `${API_BASE_URL}${encryptedEndpoint}`;
};

export const getToken = async () => {
  return await SecureStore.getItemAsync("authToken");
};
