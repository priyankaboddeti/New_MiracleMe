import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons
import { useEffect, useState } from "react";
import { Animated, Easing, StyleSheet, Text, View } from "react-native";

const Toast = ({ message, type, visible, onHide }) => {
  const [fadeAnim] = useState(new Animated.Value(0)); // Initial opacity 0

  useEffect(() => {
    if (visible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start(() => {
        setTimeout(() => {
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 300,
            easing: Easing.ease,
            useNativeDriver: true,
          }).start(() => {
            if (onHide) {
              onHide();
            }
          });
        }, 2000); // Display for 2 seconds
      });
    }
  }, [visible, fadeAnim, onHide]);

  const backgroundColor = () => {
    switch (type) {
      case "success":
        return "#4CAF50";
      case "error":
        return "#F44336";
      case "warning":
        return "#FF9800";
      default:
        return "#333";
    }
  };

  const iconName = () => {
    switch (type) {
      case "success":
        return "check-circle"; // FontAwesome5
      case "error":
        return "alert-circle"; // Ionicons
      case "warning":
        return "exclamation-triangle"; // FontAwesome5
      default:
        return "info-circle"; // FontAwesome5
    }
  };

  const IconComponent = () => {
    const name = iconName();
    if (type === "error") {
      return (
        <Ionicons name={name} size={24} color="#fff" style={styles.toastIcon} />
      );
    } else {
      return (
        <FontAwesome5
          name={name}
          size={24}
          color="#fff"
          style={styles.toastIcon}
        />
      );
    }
  };

  if (!visible) {
    return null;
  }

  return (
    <Animated.View
      style={[
        styles.toastContainer,
        { backgroundColor: backgroundColor(), opacity: fadeAnim },
      ]}
    >
      <View style={styles.toastContent}>
        <IconComponent />
        <Text style={styles.toastText}>{message}</Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  toastContainer: {
    position: "absolute",
    top: 60, // Adjust as needed
    left: 20,
    right: 20,
    padding: 15,
    borderRadius: 8, // More rounded corners
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000", // Add shadow for depth
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  toastText: {
    fontFamily: "MontserratSemiBold",
    color: "#fff",
    fontSize: 16,
    marginLeft: 10,
  },
  toastContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  toastIcon: {
    marginRight: 5,
  },
});

export default Toast;
