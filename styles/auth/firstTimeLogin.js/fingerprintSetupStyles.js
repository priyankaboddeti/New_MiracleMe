import { Dimensions, StyleSheet } from "react-native";
import { colors } from "../../../constants/Colors";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.whiteClr, // ✅ Used colors for consistency
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
  },
  logoContainer: {
    flex: 1.2,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  loginTextSection: {
    flex: 0.5,
    justifyContent: "center",
  },
  loginText: {
    fontFamily: "MontserratSemiBold",
    fontSize: 28,
    color: colors.navyBlueClr,
  },
  subTextSection: {
    flex: 0.5,
    justifyContent: "center",
  },
  subText: {
    fontFamily: "MontserratMedium",
    fontSize: 15,
    color: colors.navyBlueClr,
  },
  fingerprintImageSection: {
    flex: 1,
    justifyContent: "center",
  },
  fingerprintButton: {
    borderRadius:
      Math.round(
        Dimensions.get("window").width + Dimensions.get("window").height
      ) / 2,
    width: Dimensions.get("window").width * 0.32,
    height: Dimensions.get("window").width * 0.32,
    backgroundColor: "#00AAE7",
    justifyContent: "center",
    alignItems: "center",
  },
  fingerprintIcon: {
    borderRadius:
      Math.round(
        Dimensions.get("window").width + Dimensions.get("window").height
      ) / 2,
    width: Dimensions.get("window").width * 0.22,
    height: Dimensions.get("window").width * 0.22,
  },
  buttonSection: {
    display: "flex",
    flex: 1,
    marginTop: 20,
    width: "55%",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingVertical: 10,
  },
  proceedButton: {
    flex: 0.8,
    width: "80%",
    marginBottom: 10,
    borderRadius: 30,
    backgroundColor: colors.navyBlueClr,
    justifyContent: "center",
  },
  proceedButtonText: {
    textAlign: "center",
    color: colors.whiteClr,
    fontFamily: "MontserratMedium",
    fontSize: 16,
  },
  skipButton: {
    flex: 0.8,
    width: "80%",
    marginTop: 10,
    borderRadius: 30,
    borderColor: colors.navyBlueClr,
    borderWidth: 1,
    backgroundColor: colors.whiteClr,
    justifyContent: "center",
  },
  skipButtonText: {
    textAlign: "center",
    color: colors.navyBlueClr,
    fontFamily: "MontserratSemiBold",
    fontSize: 16,
  },
  background: {
    flex: 2.5,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-end",
    width: "100%",
    overflow: "hidden",
  },
  backgroundPicture: {
    flex: 1,
  },
});
