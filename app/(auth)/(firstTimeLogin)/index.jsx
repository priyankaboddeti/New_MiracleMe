import React, { useState } from "react";
import {
  View,
  useWindowDimensions,
  KeyboardAvoidingView,
  TouchableOpacity,
  Text,
  Alert,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Buildings from "../../../assets/images/Buildings";
import MiracleLogo from "../../../assets/images/MiracleLogo";
import InputField from "../../../components/InputField";
import signInStrings from "../../../constants/SignInStrings";
import WarningDialog from "../../../components/WarningDialog";
import styles from "../../../styles/auth/firstTimeLogin.js/signInStyles";
import { signIn } from "../../../services/redux/features/auth-slice";
import { useDispatch } from "react-redux";
import { useHubbleLoginMutation } from "../../../services/apiService";
import * as SecureStore from "expo-secure-store";
import { useRouter } from "expo-router";

export default function SignIn() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [hubbleLogin, { isLoading, error, data }] = useHubbleLoginMutation();
  const windowHeight = useWindowDimensions().height;

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [modalVisible, setModalVisible] = useState(false);

  const handleInputChange = (field, value) =>
    setCredentials((prev) => ({ ...prev, [field]: value }));

  const handleLogin = async () => {
    if (!credentials.username || !credentials.password) {
      Alert.alert("Error", "Please enter username and password");
      return;
    }

    try {
      console.log("🟡 Calling API...");
      const response = await hubbleLogin(credentials).unwrap();

      console.log("🟢 Final Response After Transform:", response); // Check transformed response

      if (response.success) {
        console.log("🔐 Storing token...");
        await SecureStore.setItemAsync(
          "tokenData",
          JSON.stringify(response.decodedToken)
        );

        console.log("🚀 Dispatching to Redux...");
        dispatch(signIn(response.decodedToken));

        Alert.alert(response.message);

        router.push("/passcodeSetup");
      } else {
        console.warn("⛔ Login failed, invalid credentials.");
        Alert.alert("Error", "Invalid credentials");
      }
    } catch (err) {
      console.error("❌ API Call Failed:", err);
      Alert.alert("Login Failed", err?.data || "Something went wrong!");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior="height"
      style={[styles.container, { minHeight: windowHeight }]}
    >
      <View style={styles.logoContainer}>
        <MiracleLogo />
      </View>

      <View style={styles.inputContainer}>
        <InputField
          icon="user-alt"
          placeholder={signInStrings.userName}
          value={credentials.username}
          onChangeText={(text) =>
            handleInputChange("username", text.toLowerCase())
          }
        />
        <InputField
          icon="lock"
          placeholder={signInStrings.passwordName}
          value={credentials.password}
          onChangeText={(text) => handleInputChange("password", text)}
          secureTextEntry
          isPassword
        />
        <TouchableOpacity onPress={handleLogin} style={styles.signInButton}>
          <Text style={styles.signInText}>{signInStrings.login}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.background}>
        <Buildings style={{ flex: 1 }} />
      </View>
      <WarningDialog
        visible={modalVisible}
        onDismiss={() => setModalVisible(false)}
      />
    </KeyboardAvoidingView>
  );
}
