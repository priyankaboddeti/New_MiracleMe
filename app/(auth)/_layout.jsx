import { Stack } from "expo-router";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function AuthLayout() {
  const { isSignIn } = useSelector((state) => state.auth);

  useEffect(() => {
    console.log(isSignIn, "isSignIn");
  }, [isSignIn]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {isSignIn ? (
        <Stack.Screen
          name="(secondTimeLogin)"
          options={{ headerShown: false }}
        />
      ) : (
        <Stack.Screen
          name="(firstTimeLogin)"
          options={{ headerShown: false }}
        />
      )}
    </Stack>
  );
}
