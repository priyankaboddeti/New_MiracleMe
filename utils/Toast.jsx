import { FontAwesome5 } from "@expo/vector-icons";
import { useEffect } from "react";
import { Animated, Text } from "react-native";

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
        return "red";
      case "warning":
        return "#FF9800";
      default:
        return "#333";
    }
  };

  const iconName = () => {
    switch (type) {
      case "success":
        return "check-circle";
      case "error":
        return "alert-circle";
      case "warning":
        return "alert-triangle";
      default:
        return "info-circle";
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
        <FontAwesome5
          name={iconName()}
          size={24}
          color="#fff"
          style={styles.toastIcon}
        />
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
