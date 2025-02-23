import React, { useState } from "react";
import {
  View,
  useWindowDimensions,
  KeyboardAvoidingView,
  TouchableOpacity,
  Text,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { PaperProvider } from "react-native-paper";
import Buildings from "../../../assets/images/Buildings";
import MiracleLogo from "../../../assets/images/MiracleLogo";
import InputField from "../../../components/InputField";
import signInStrings from "../../../constants/SignInStrings";
import WarningDialog from "../../../components/WarningDialog";
import styles from "../../../styles/signInStyles";
import { signIn } from "../../../services/redux/features/auth-slice";
import { useDispatch } from "react-redux";
import {useHubbleLoginMutation} from '../../../services/apiService'
import jwt_decode from "jwt-decode";


export default function SignIn() {
  const dispatch = useDispatch();
  const [hubbleLogin, { isLoading,error, data }] = useHubbleLoginMutation();
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
      const response = await hubbleLogin(credentials).unwrap(); // Call API
      console.log(response,"res")
      const userDetails=jwt_decode(response.token)
      console.log(userDetails,"userDetails")
      if (response.success==true) {
        // Save the token securely
        await SecureStore.setItemAsync("authToken", response.token);
        
        // Dispatch action to save token in Redux state
        dispatch(signIn(response.token));

        Alert.alert("Success", "Login successful!");
        // Navigate to next screen if needed
      } else {
        Alert.alert("Error", "Invalid credentials");
      }
    } catch (err) {
      Alert.alert("Login Failed", err?.data || "Something went wrong!");
    }
  };

  return (
    <PaperProvider>
      <SafeAreaProvider>
        <SafeAreaView
          style={styles.safeArea}
          edges={["left", "right", "top", "bottom"]}
        >
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
              <TouchableOpacity
                onPress={handleLogin}
                style={styles.signInButton}
              >
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
        </SafeAreaView>
      </SafeAreaProvider>
    </PaperProvider>
  );
}
