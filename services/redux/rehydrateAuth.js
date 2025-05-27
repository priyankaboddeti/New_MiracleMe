import * as SecureStore from "expo-secure-store";
import { signIn } from "./features/auth-slice"; // Adjust path if needed

export const rehydrateAuth = () => async (dispatch) => {
  try {
    const jwtToken = await SecureStore.getItemAsync("encryptedToken");
    const decodedTokenString = await SecureStore.getItemAsync("decodedToken");
    const decodedJwtToken = decodedTokenString
      ? JSON.parse(decodedTokenString)
      : null;

    if (jwtToken && decodedJwtToken) {
      dispatch(
        signIn({ jwtToken: token, decodedJwtToken: JSON.parse(decoded) })
      );
      console.log("✅ Auth state rehydrated from SecureStore");
    } else {
      console.log("ℹ️ No auth tokens found in SecureStore");
    }
  } catch (error) {
    console.error("❌ Error rehydrating auth state:", error);
  }
};
