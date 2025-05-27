import * as Haptics from "expo-haptics";
import { View, Text, TouchableOpacity } from "react-native";
import React, { useRef, useState } from "react";
import styles from "../../../styles/auth/secondTimeLogin.js/passcodeLoginSetupStyles";
import MiracleLogo from "../../../assets/images/MiracleLogo";
import { useDispatch, useSelector } from "react-redux";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../../../constants/Colors";
import { signOut } from "../../../services/redux/features/auth-slice";
import { useRouter } from "expo-router";

export default function passcodeLogin() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [enteredPin, setEnteredPin] = useState("");
  const [visiblePin, setVisiblePin] = useState([]);
  const decodedJwtToken = useSelector((state) => state.auth.decodedJwtToken);

  // console.log("Decoded JWT Token: ", decodedJwtToken);
  const timeoutRef = useRef(null);

  const hideAllChars = (pinLength) => {
    setVisiblePin((prevVisiblePin) => {
      const newVisiblePin = [...prevVisiblePin];
      for (let i = 0; i < 4; i++) {
        newVisiblePin[i] = null;
      }
      return newVisiblePin;
    });
  };

  const handleBackspacePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (enteredPin.length > 0) {
      // Remove last character from enteredPin
      setEnteredPin((prevPin) => prevPin.slice(0, -1));

      // Hide the last visible character
      setVisiblePin((prevVisiblePin) => {
        const newVisiblePin = [...prevVisiblePin];
        newVisiblePin[enteredPin.length - 1] = null;
        return newVisiblePin;
      });
    }
  };

  const hidePasscode = (pinLength) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => hideAllChars(pinLength), 300);
  };

  const handleNumberPress = (number) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (enteredPin.length < 4) {
      setEnteredPin(enteredPin + number);
      setVisiblePin((prevVisiblePin) => {
        const newVisiblePin = [...prevVisiblePin];
        newVisiblePin[enteredPin.length] = number;
        return newVisiblePin;
      });
      hidePasscode(enteredPin.length + 1);
      if (enteredPin.length + 1 === 4) {
        // First pin complete, switch to confirm pin input
      }
    }
  };

  const renderPasscodeInput = (currentPin, visiblePin) => (
    <View style={styles.input}>
      {Array(4)
        .fill(null)
        .map((_, index) => {
          const isActive = index === currentPin.length; // current position
          const isFirstEmpty = currentPin.length === 0 && index === 0;

          return (
            <View
              key={index}
              style={[
                styles.round,
                (isActive || isFirstEmpty) && {
                  borderColor: "rgba(0, 33, 71, 0.5)", // semi-transparent navy blue
                  borderWidth: 2,
                },
              ]}
            >
              <View
                style={[
                  styles.innerRound,
                  {
                    justifyContent: "center",
                    alignItems: "center",
                  },
                ]}
              >
                {visiblePin[index] ? (
                  <Text style={[styles.passcodeText, { fontSize: 30 }]}>
                    {visiblePin[index]}
                  </Text>
                ) : currentPin[index] ? (
                  <View style={styles.hiddenDot} />
                ) : null}
              </View>
            </View>
          );
        })}
    </View>
  );

  const handleSubmitPin = async () => {
    try {
      const storedPin = await SecureStore.getItemAsync("mpin");

      if (storedPin === enteredPin) {
        // Match: navigate to next screen
        router.push("/fingerprintSetup"); // or navigation.navigate("FingerprintSetup")
      } else {
        // Mismatch: show error toast or alert
        Alert.alert("Incorrect PIN", "The entered PIN does not match.");
      }
    } catch (error) {
      console.error("Failed to get mpin:", error);
    }
  };

  const renderNumberRow = (numbers) => (
    <View style={styles.NumberRow}>
      {numbers.map((number, index) => (
        <TouchableOpacity
          key={index}
          style={styles.number}
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            if (number === "←") {
              handleBackspacePress();
            } else if (number === "✓") {
              //API Call( pending)
              handleSubmitPin();
            } else if (number !== "") {
              handleNumberPress(number);
            }
          }}
        >
          {number === "←" ? (
            <MaterialIcons name="backspace" size={37} color={colors.whiteClr} />
          ) : number === "✓" && enteredPin.length === 4 ? (
            <MaterialIcons
              name="check-circle"
              size={40}
              color={colors.whiteClr}
            />
          ) : number !== "✓" ? (
            <Text style={styles.numberText}>{number}</Text>
          ) : null}
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Logo Section */}
      <View style={styles.logoContainer}>
        <MiracleLogo />
      </View>

      {/* Welcome Message */}
      <View style={styles.WelcomeContainer}>
        <Text style={styles.welcome}>{`Welcome ${decodedJwtToken}`}</Text>
      </View>

      {/* SubText */}
      <View style={styles.subTextView}>
        <Text style={styles.subText}>
          To confirm your identity, please enter your 4 digit PIN
        </Text>
      </View>

      <TouchableOpacity
        onPress={() => {
          dispatch(signOut());
          router.replace("/(auth)/(firstTimeLogin)");
        }}
      >
        <Text adjustsFontSizeToFit style={styles.subText1}>
          Forgot PIN ?
        </Text>
      </TouchableOpacity>

      <View style={styles.passcode}>
        <View style={{ marginHorizontal: 20 }}>
          {renderPasscodeInput(enteredPin, visiblePin)}
          <View style={styles.secondRow}>
            {renderNumberRow(["1", "2", "3"])}
          </View>
          <View style={styles.thirdRow}>
            {renderNumberRow(["4", "5", "6"])}
          </View>
          <View style={styles.forthRow}>
            {renderNumberRow(["7", "8", "9"])}
          </View>
          <View style={styles.forthRow}>
            {renderNumberRow(["←", "0", "✓"])}
          </View>
        </View>
      </View>
    </View>
  );
}
