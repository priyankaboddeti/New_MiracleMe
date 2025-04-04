import { View, Text } from "react-native";
import React from "react";
import styles from "../../styles/dashboard/dashboardStyles";

export default function index() {
  console.log("dashboard");
  return (
    <View style={styles.container}>
      <Text>index</Text>
    </View>
  );
}
