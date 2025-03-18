import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import styles from "../../../styles/auth/firstTimeLogin.js/passcodeSetupStyles";
import MiracleLogo from "../../../assets/images/MiracleLogo";
import { colors } from "../../../constants/Colors";
import * as Haptics from 'expo-haptics';
import { MaterialIcons } from "@expo/vector-icons";


export default function PasscodeSetup() {
 

  return (
    <View style={styles.container}>
      {/* Logo Section */}
      <View style={styles.logoContainer}>
        <MiracleLogo />
      </View>

      {/* Welcome Message */}
      <View style={styles.WelcomeContainer}>
        <Text style={styles.welcome}>Welcome!</Text>
        <Text style={styles.subText}>Set your access passcode</Text>
      </View>

      {/* Placeholder View */}
      <View style={styles.passcode}>
      </View>
    </View>
  );
}
