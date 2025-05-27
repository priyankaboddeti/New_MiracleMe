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
import { useHubbleLoginMutation } from "../../../services/hubbleApi";
import * as SecureStore from "expo-secure-store";
import { useRouter } from "expo-router";
import { encryptString, decryptString } from "../../../utils/encryption";

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

  // Alternative payload formats to try if the first one doesn't work
  // const tryAlternativeFormats = async () => {
  //   const apiUrl = "https://dev-hubble-api.miraclesoft.com/hubble-v4/";
  //   const apiKey = "123456$#@$^@1ERF";
  //   const endpoint = "employees/login";

  //   for (const format of payloadFormats) {
  //     console.log(`📦 Trying ${format.name} format`);
  //     console.log(`📦 Payload:`, format.data);

  //     try {
  //       const response = await hubbleLogin(credentials).unwrap();

  //       console.log(`🔹 ${format.name} response status:`, response.status);

  //       const responseText = await response.text();
  //       console.log(`🔹 ${format.name} raw response:`, responseText);

  //       if (response.ok) {
  //         console.log(`✅ ${format.name} login successful!`);
  //         return { success: true, responseText };
  //       }
  //     } catch (error) {
  //       console.error(`❌ ${format.name} fetch error:`, error);
  //     }
  //   }

  //   return { success: false };
  // };

  // Update handleLogin to try alternative formats if the first attempt fails
  const handleLogin = async () => {
    if (!credentials.username || !credentials.password) {
      Alert.alert("Error", "Please enter username and password");
      return;
    }

    try {
      console.log("🟡 Calling API...", credentials);
      const response = await hubbleLogin(credentials).unwrap();

      console.log("🟢 Final Response After Transform:", response);
      const jwtToken = response.token;
      const decodedJwtToken = response.decodedToken;

      console.log(jwtToken, "Encrypted Token pass to all API's");

      if (response.success) {
        console.log("✅ Login successful!", response);
        console.log("🔐 Storing token...");
        processSuccessfulLogin(response);
        // Save credentials for future token refreshes (securely)
        await SecureStore.setItemAsync(
          "userCredentials",
          JSON.stringify(credentials)
        );

        console.log("🚀 Dispatching to Redux...");
        dispatch(signIn({ jwtToken, decodedJwtToken }));

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

  // Helper function to process successful login
  const processSuccessfulLogin = async (responseText) => {
    console.log(typeof responseText, "responseText");
    try {
      const responseData = JSON.parse(responseText);
      console.log(typeof responseData);

      if (responseData.token) {
        const jwtToken = responseData.token;
        const decodedJwtToken = decodeJwt(jwtToken);

        // Save credentials for future token refreshes
        await SecureStore.setItemAsync(
          "userCredentials",
          JSON.stringify(credentials)
        );

        // Dispatch to Redux
        dispatch(signIn({ jwtToken, decodedJwtToken }));

        Alert.alert("Success", "Login successful");
        router.push("/passcodeSetup");
      } else {
        console.log("No token found in response:", responseData);
        Alert.alert(
          "Login Error",
          "Authentication successful but no token received"
        );
      }
    } catch (parseError) {
      console.error("❌ Parse error:", parseError);
      Alert.alert("Error", "Failed to process response");
    }
  };

  // Helper function to decode JWT
  function decodeJwt(token) {
    try {
      const parts = token.split(".");
      if (parts.length !== 3) {
        throw new Error("Invalid JWT format");
      }

      const payload = atob(parts[1].replace(/-/g, "+").replace(/_/g, "/"));
      return JSON.parse(payload);
    } catch (error) {
      console.error("JWT decoding error:", error);
      return null;
    }
  }

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
