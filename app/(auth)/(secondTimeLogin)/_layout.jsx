import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";

export default function AuthLayout() {
  const router = useRouter();

  useEffect(() => {
    // Ensure we navigate to passcodeLogin when this layout mounts
    router.replace("/(auth)/(secondTimeLogin)/passcodeLogin");
  }, []);

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
      <Stack.Screen name="passcodeLogin" options={{ headerShown: false }} />
      <Stack.Screen name="fingerprintLogin" options={{ headerShown: false }} />
    </Stack>
  );
}
