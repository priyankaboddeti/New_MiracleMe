import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";

export default function AuthLayout() {
  const [isSignedIn, setIsSignedIn] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSignIn = async () => {
      try {
        const response = await SecureStore.getItemAsync("isSignIn");
        if (response !== null && response !== undefined) {
          setIsSignedIn(response === "true");
        } else {
          setIsSignedIn(false);
        }
      } catch (error) {
        console.error(error);
        setIsSignedIn(false);
      } finally {
        setLoading(false);
      }
    };
    checkSignIn();
  }, []);

  if (loading) {
    return null;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {isSignedIn
        ? console.log("Going to secondTimeLogin") || (
            <Stack.Screen
              name="(secondTimeLogin)"
              options={{ headerShown: false }}
            />
          )
        : console.log("Going to firstTimeLogin") || (
            <Stack.Screen
              name="(firstTimeLogin)"
              options={{ headerShown: false }}
            />
          )}
    </Stack>
  );
}
