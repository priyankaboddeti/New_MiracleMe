import * as SecureStore from "expo-secure-store";
import { isTokenExpired, willTokenExpireSoon } from "../utils/tokenUtils";

// This function will be called after store is initialized
export const setupTokenRefresh = (store) => {
  // Function to refresh token by calling login API again
  const refreshToken = async () => {
    try {
      // Get stored credentials
      const savedCredentials = await SecureStore.getItemAsync(
        "userCredentials"
      );

      if (!savedCredentials) {
        console.log("❌ No saved credentials found for token refresh");
        const { signOut } = await import("./redux/features/auth-slice");
        store.dispatch(signOut());
        return false;
      }

      const credentials = JSON.parse(savedCredentials);

      // Get API endpoints
      const { HubbleApi } = await import("./hubbleApi");

      // Call login API again
      const result = await store
        .dispatch(HubbleApi.endpoints.hubbleLogin.initiate(credentials))
        .unwrap();

      if (result.success && result.token) {
        console.log("✅ Token refreshed successfully via login API");
        return true;
      } else {
        console.log("❌ Token refresh failed");
        const { signOut } = await import("./redux/features/auth-slice");
        store.dispatch(signOut());
        return false;
      }
    } catch (error) {
      console.error("❌ Error refreshing token:", error);
      const { signOut } = await import("./redux/features/auth-slice");
      store.dispatch(signOut());
      return false;
    }
  };

  // Function to check token and refresh if needed
  const checkAndRefreshTokenIfNeeded = async () => {
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
  const setupTokenRefreshTimer = () => {
    // Check token every 5 minutes
    const REFRESH_INTERVAL = 5 * 60 * 1000;

    const intervalId = setInterval(async () => {
      await checkAndRefreshTokenIfNeeded();
    }, REFRESH_INTERVAL);

    // Return function to clear interval
    return () => clearInterval(intervalId);
  };

  // Create a middleware to check token before each request
  const createTokenRefreshMiddleware = () => {
    return (next) => async (action) => {
      // Only intercept RTK Query actions that start a request
      if (
        action.type.endsWith("/executeQuery") ||
        action.type.endsWith("/executeMutation")
      ) {
        // Check and refresh token if needed before the request
        await checkAndRefreshTokenIfNeeded();
      }

      // Continue with the action
      return next(action);
    };
  };

  return {
    checkAndRefreshTokenIfNeeded,
    setupTokenRefreshTimer,
    createTokenRefreshMiddleware,
  };
};
