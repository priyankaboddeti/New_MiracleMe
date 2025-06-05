import * as SecureStore from "expo-secure-store";
import { signIn } from "./features/auth-slice";

export const rehydrateAuth = () => async (dispatch) => {
  try {
    console.log("🔄 Starting auth rehydration...");
    const jwtToken = await SecureStore.getItemAsync("encryptedToken");
    const decodedTokenString = await SecureStore.getItemAsync("decodedToken");

    console.log("📦 Retrieved tokens:", {
      jwtToken: jwtToken ? "exists" : "missing",
      decodedToken: decodedTokenString ? "exists" : "missing",
    });

    const decodedJwtToken = decodedTokenString
      ? JSON.parse(decodedTokenString)
      : null;

    if (jwtToken && decodedJwtToken) {
      console.log("🔑 Tokens found, dispatching signIn action");
      dispatch(signIn({ jwtToken, decodedJwtToken }));
      console.log("✅ Auth state rehydrated from SecureStore");
      return true;
    } else {
      console.log("ℹ️ No auth tokens found in SecureStore");
      return false;
    }
  } catch (error) {
    console.error("❌ Error rehydrating auth state:", error);
    return false;
  }
};
