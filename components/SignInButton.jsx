import React from "react";
import { TouchableOpacity, Text, ActivityIndicator, StyleSheet } from "react-native";


const SignInButton = ({ onPress, isLoading, text }) => (
  <TouchableOpacity style={styles.signIn} onPress={onPress}>
    {isLoading ? (
      <ActivityIndicator size="small" color="whiteClr" />
    ) : (
      <Text style={styles.signInText}>{text}</Text>
    )}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  signIn: {
    width: "30%",
    backgroundColor: "navyBlueClr",
    height: "90%",
    borderRadius: 30,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  signInText: {
    color: "white",
    fontSize: 18,
    fontFamily: "Montserrat_300Light",
  },
});

export default SignInButton;