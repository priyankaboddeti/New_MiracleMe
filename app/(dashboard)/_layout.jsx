import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { colors } from "../../constants/Colors";

export default function Dashboard_layout() {
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
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
}
