import * as SecureStore from "expo-secure-store";

// Function to add authorization header to requests
export const addAuthHeader = async (headers) => {
  const token = await SecureStore.getItemAsync("encryptedToken");
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }
  return headers;
};
