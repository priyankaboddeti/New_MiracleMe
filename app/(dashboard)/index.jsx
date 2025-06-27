import { View, Text } from "react-native";
import * as SecureStore from "expo-secure-store";
import styles from "../../styles/dashboard/dashboardStyles";

export default function index() {
  const decodedToken = SecureStore.getItemAsync("decodedJwtToken");
  console.log("dashboard");
  return (
    <View style={styles.container}>
      <Text>Dashboard------</Text>
    </View>
  );
}
