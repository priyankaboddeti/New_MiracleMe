import { Stack } from "expo-router";

export default function AuthLayout() {
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
