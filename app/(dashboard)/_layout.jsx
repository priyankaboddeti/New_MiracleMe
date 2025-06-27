import { View, Text } from "react-native";
import React from "react";
import { Stack, Tabs } from "expo-router";
import { Colors, colors } from "../../constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function Dashboard_layout() {
  return (
    <React.Fragment>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "teal",
          safeAreaInsets: { bottom: 0 },
        }}
      >
        <Tabs.Screen name="index" />
        <Tabs.Screen
          name="employeeSearch"
          options={{
            tabBarIcon: ({ color, size }) => {
              <MaterialCommunityIcons
                name="account-search"
                size={24}
                color="black"
              />;
            },
          }}
        />
        <Tabs.Screen name="leaves" />
        <Tabs.Screen name="timesheets" />
        <Tabs.Screen name="payslip" />
        <Tabs.Screen name="livetracking" />
      </Tabs>
    </React.Fragment>
  );
}
