import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import styles from "../../../styles/auth/firstTimeLogin.js/passcodeSetupStyles";
import MiracleLogo from "../../../assets/images/MiracleLogo";
import { colors } from "../../../constants/Colors";
import * as Haptics from "expo-haptics";
import { MaterialIcons } from "@expo/vector-icons";
import { useToast } from "../../../utils/Toast/ToastContext";
import * as SecureStore from "expo-secure-store";
import { useRouter } from "expo-router";

export default function PasscodeSetup() {
  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [pinError, setPinError] = useState("");
  const [confirmPinError, setConfirmPinError] = useState("");
  const [visiblePin, setVisiblePin] = useState([]);
  const [visibleConfirmPin, setVisibleConfirmPin] = useState([]);
  const timeoutRef = useRef(null);
  const { showToast } = useToast();
  const router = useRouter();

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const hideAllChars = (pinLength, confirmPinLength) => {
    setVisiblePin((prevVisiblePin) => {
      const newVisiblePin = [...prevVisiblePin];
      for (let i = 0; i < 4; i++) {
        newVisiblePin[i] = null;
      }
      return newVisiblePin;
    });

    setVisibleConfirmPin((prevVisibleConfirmPin) => {
      const newVisibleConfirmPin = [...prevVisibleConfirmPin];
      for (let i = 0; i < 4; i++) {
        newVisibleConfirmPin[i] = null;
      }
      return newVisibleConfirmPin;
    });
  };

  const hidePasscode = (pinLength, confirmPinLength) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(
      () => hideAllChars(pinLength, confirmPinLength),
      300
    );
  };

  const renderPasscodeInput = (currentPin, visiblePin) => (
    <View style={styles.input}>
      {Array(4)
        .fill(null)
        .map((_, index) => (
          <View key={index} style={styles.round}>
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
        ))}
    </View>
  );

  const handleNumberPress = (number) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (pin.length < 4) {
      setPin(pin + number);
      setVisiblePin((prevVisiblePin) => {
        const newVisiblePin = [...prevVisiblePin];
        newVisiblePin[pin.length] = number;
        return newVisiblePin;
      });
      hidePasscode(pin.length + 1, confirmPin.length);
      if (pin.length + 1 === 4) {
        // First pin complete, switch to confirm pin input
      }
    } else if (confirmPin.length < 4) {
      setConfirmPin(confirmPin + number);
      setVisibleConfirmPin((prevVisibleConfirmPin) => {
        const newVisibleConfirmPin = [...prevVisibleConfirmPin];
        newVisibleConfirmPin[confirmPin.length] = number;
        return newVisibleConfirmPin;
      });
      hidePasscode(pin.length, confirmPin.length + 1);

      // Immediate comparison and error toast
      if (pin.length === 4 && confirmPin.length + 1 === 4) {
        //compare only when confirmPin is complete.
        if (pin !== confirmPin + number) {
          //compare pin to the confirmPin as it is being built.
          showToast("Pin do not match.", "error");
          setConfirmPin(""); //reset confirm pin
          setVisibleConfirmPin([]); //reset visible confirm pin.
        } else {
          // Pins match!
          showToast("Pin match!", "success");
        }
      }
    }
  };

  const handleBackspacePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (confirmPin.length > 0) {
      setConfirmPin(confirmPin.slice(0, -1));
      setVisibleConfirmPin((prevVisibleConfirmPin) => {
        const newVisibleConfirmPin = [...prevVisibleConfirmPin];
        newVisibleConfirmPin[confirmPin.length - 1] = null;
        return newVisibleConfirmPin;
      });
    } else {
      setPin(pin.slice(0, -1));
      setVisiblePin((prevVisiblePin) => {
        const newVisiblePin = [...prevVisiblePin];
        newVisiblePin[pin.length - 1] = null;
        return newVisiblePin;
      });
    }
  };

  const renderNumberRow = (numbers) => (
    <View style={styles.NumberRow}>
      {numbers.map((number, index) => (
        <TouchableOpacity
          key={index}
          style={styles.number}
          onPress={async () => {
            if (number === "←") {
              handleBackspacePress();
            } else if (number === "✓") {
              //API Call( pending)
              console.log("result");
              await SecureStore.setItemAsync("mpin", pin);
              router.push("/fingerprintSetup");
            } else if (number !== "") {
              handleNumberPress(number);
            }
          }}
        >
          {number === "←" ? (
            <MaterialIcons name="backspace" size={37} color={colors.whiteClr} />
          ) : number === "✓" && pin.length === 4 && confirmPin.length === 4 ? (
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
        <Text style={styles.welcome}>Welcome!</Text>
        <Text style={styles.subText}>Set your access passcode</Text>
      </View>

      {/* Placeholder View */}
      <View style={styles.passcode}>
        <View style={{ paddingVertical: 25 }}>
          <View style={{ alignItems: "center" }}>
            <Text adjustsFontSizeToFit style={styles.Label}>
              {" "}
              Enter a 4 digit pin
            </Text>
            {renderPasscodeInput(pin, visiblePin)}
          </View>
          <View style={{ alignItems: "center" }}>
            <Text adjustsFontSizeToFit style={styles.Label}>
              {" "}
              Confirm your 4 digit pin
            </Text>
            {renderPasscodeInput(confirmPin, visibleConfirmPin)}
          </View>
          <View style={{ marginHorizontal: 20 }}>
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
    </View>
  );
}
