import { View, Text, Platform, Image, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import styles from "../../../styles/auth/firstTimeLogin.js/fingerprintSetupStyles";
import MiracleLogo from "../../../assets/images/MiracleLogo";
import Buildings from "../../../assets/images/Buildings";
import { useDispatch, useSelector } from "react-redux";
import {
  checkFingerprintAvailability,
  authenticateWithFingerprint,
} from "../../../services/redux/features/fingerprintAuth-slice"; // Adjust the path if needed
import { useRouter } from "expo-router";
import { updateSignInStatus } from "../../../services/redux/features/auth-slice";

export default function FingerprintSetup() {
  const router = useRouter();
  // Assuming you have navigation prop
  const dispatch = useDispatch();
  const {
    isFingerprintAuthAvailable,
    fingerprintAuthError,
    isFingerprintAuthEnabled,
  } = useSelector((state) => state.fingerprintAuth);

  useEffect(() => {
    dispatch(checkFingerprintAvailability());
  }, [dispatch]);

  const handleAuthenticate = async () => {
    if (!isFingerprintAuthAvailable) {
      // Handle the case where fingerprint auth is not available
      alert("Fingerprint authentication is not available on this device.");
      return;
    }

    const success = await dispatch(authenticateWithFingerprint());
    if (success) {
      console.log(isFingerprintAuthEnabled, "isFingerprintAuthEnabled");
      console.log("Fingerprint authentication successful!");
      dispatch(updateSignInStatus(true));
      router.replace("/(dashboard)");
      // Navigate to the next screen or perform other actions
    } else {
      console.log("Fingerprint authentication failed.");
      // Optionally show an error message to the user
      alert("Fingerprint authentication failed. Please try again.");
    }
  };

  const handleSkip = () => {
    router.push("/(dashboard)");
    // Navigate to the next screen without enabling fingerprint auth
  };

  return (
    <View style={styles.container}>
      {/* Logo Section */}
      <View style={styles.logoContainer}>
        <MiracleLogo />
      </View>

      {/* Login Text */}
      <View style={styles.loginTextSection}>
        <Text style={styles.loginText}>LOGIN</Text>
      </View>

      {/* SubText */}
      <View style={styles.subTextSection}>
        <Text style={styles.subText}>
          {Platform.OS === "ios"
            ? "Authenticate using your faceId"
            : "Authenticate using your fingerprint"}
        </Text>
      </View>

      {/* FingerPrint Image */}
      <View style={styles.fingerprintImageSection}>
        <TouchableOpacity
          style={styles.fingerprintButton}
          onPress={() => handleAuthenticate()} // Directly trigger authentication on icon press
        >
          <Image
            style={styles.fingerprintIcon}
            source={require("../../../assets/images/Fingerprint.png")}
          />
        </TouchableOpacity>
      </View>

      {/* Buttons */}
      <View style={styles.buttonSection}>
        <TouchableOpacity
          onPress={() => handleAuthenticate()}
          style={styles.proceedButton}
        >
          <Text style={styles.proceedButtonText}>Proceed</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
          <Text style={styles.skipButtonText}>Skip</Text>
        </TouchableOpacity>
      </View>

      {/* Background Picture */}
      <View style={styles.backgroundSection}>
        <Buildings style={styles.backgroundPicture} />
      </View>

      {fingerprintAuthError && (
        <Text style={{ color: "red", textAlign: "center" }}>
          {fingerprintAuthError}
        </Text>
      )}
    </View>
  );
}
