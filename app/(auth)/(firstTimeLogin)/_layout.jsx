import { Stack } from "expo-router";
import { useSelector } from "react-redux";
import { colors } from "../../../constants/Colors";

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.blueClr,
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen
        name="passcodeSetup"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="fingerprintSetup"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
