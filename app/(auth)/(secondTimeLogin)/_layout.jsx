import { Stack, useRouter } from "expo-router";
import { useEffect, useLayoutEffect } from "react";
import { useSelector } from "react-redux";

export default function AuthLayout() {
  const router = useRouter();
  const { isFingerprintAuthEnabled } = useSelector(
    (state) => state.fingerprintAuth
  );
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#f4511e",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      {isFingerprintAuthEnabled ? (
        <Stack.Screen
          name="fingerprintLogin"
          options={{ headerShown: false }}
        />
      ) : (
        <Stack.Screen name="passcodeLogin" options={{ headerShown: false }} />
      )}
    </Stack>
  );
}
