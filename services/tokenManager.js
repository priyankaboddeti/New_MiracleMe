import * as SecureStore from "expo-secure-store";
import { isTokenExpired, willTokenExpireSoon } from "../utils/tokenUtils";

let storeRef = null;

// Function to set store reference from outside
export const setStoreRef = (store) => {
  storeRef = store;
};

// Function to refresh token by calling login API again
export const refreshToken = async () => {
  try {
    if (!storeRef) {
      console.log("❌ Store reference not set");
      return false;
    }

    // Get stored credentials
    const savedCredentials = await SecureStore.getItemAsync("userCredentials");

    if (!savedCredentials) {
      console.log("❌ No saved credentials found for token refresh");
      // Use dynamic import to avoid circular dependency
      const { signOut } = await import("./redux/features/auth-slice");
      storeRef.dispatch(signOut());
      return false;
    }

    const credentials = JSON.parse(savedCredentials);

    // Dynamically import API to avoid circular dependency
    const { HubbleApi } = await import("./hubbleApi");

    // Call login API again
    const result = await storeRef
      .dispatch(HubbleApi.endpoints.hubbleLogin.initiate(credentials))
      .unwrap();

    if (result.success && result.token) {
      console.log("✅ Token refreshed successfully via login API");
      return true;
    } else {
      console.log("❌ Token refresh failed");
      const { signOut } = await import("./redux/features/auth-slice");
      storeRef.dispatch(signOut());
      return false;
    }
  } catch (error) {
    console.error("❌ Error refreshing token:", error);
    const { signOut } = await import("./redux/features/auth-slice");
    storeRef.dispatch(signOut());
    return false;
  }
};

// Function to check token and refresh if needed
export const checkAndRefreshTokenIfNeeded = async () => {
  try {
    const decodedTokenString = await SecureStore.getItemAsync(
      "decodedJwtToken"
    );
    const decodedToken = decodedTokenString
      ? JSON.parse(decodedTokenString)
      : null;

    if (!decodedToken) {
      console.log("❌ No token found");
      return false;
    }

    if (isTokenExpired(decodedToken)) {
      console.log("🔄 Token expired, refreshing...");
      return await refreshToken();
    }

    if (willTokenExpireSoon(decodedToken)) {
      console.log("🔄 Token will expire soon, refreshing proactively...");
      // Refresh in background
      refreshToken().catch((err) =>
        console.error("Background refresh failed:", err)
      );
    }

    return true;
  } catch (error) {
    console.error("❌ Error checking token:", error);
    return false;
  }
};

// Set up periodic token check
export const setupTokenRefreshTimer = () => {
  // Check token every 5 minutes
  const REFRESH_INTERVAL = 5 * 60 * 1000;

  const intervalId = setInterval(async () => {
    await checkAndRefreshTokenIfNeeded();
  }, REFRESH_INTERVAL);

  // Return function to clear interval
  return () => clearInterval(intervalId);
};
