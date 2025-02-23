import React, { useState } from "react";
import { View, TextInput } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import styles from "../styles/signInStyles";

/**
 * Reusable InputField Component
 * @param {string} icon - FontAwesome icon name
 * @param {string} placeholder - Input placeholder
 * @param {string} value - Current value of input
 * @param {function} onChangeText - Updates state on input change
 * @param {boolean} secureTextEntry - Hides text for passwords
 * @param {boolean} isPassword - If it's a password field, show toggle icon
 */
const InputField = ({ icon, placeholder, value, onChangeText, secureTextEntry, isPassword }) => {
  const [passwordVisible, setPasswordVisible] = useState(secureTextEntry);

  return (
    <View style={styles.inputBox}>
      <FontAwesome5 name={icon} size={18} color="white" style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#F5F5F5"
        value={value}
        autoCapitalize="none"
        secureTextEntry={passwordVisible}
        onChangeText={onChangeText}
      />
      {isPassword && (
        <FontAwesome5
          name={passwordVisible ? "eye-slash" : "eye"}
          size={20}
          color="white"
          onPress={() => setPasswordVisible(!passwordVisible)}
        />
      )}
    </View>
  );
};

export default InputField;
