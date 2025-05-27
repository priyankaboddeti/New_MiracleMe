import { Platform, StyleSheet } from "react-native";
import { Colors, colors } from "../../../constants/Colors";

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
  WelcomeContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 10,
    marginBottom: 10,
  },
  WelcomeView: {
    flex: 1,
    alignItems: "center",
  },
  welcome: {
    color: colors.blueClr,
    fontSize: 32,
    fontFamily: "MontserratBold",
    textAlign: "center",
  },
  subTextView: {
    flex: 0.5,
    marginHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  subText: {
    fontSize: 20,
    fontFamily: "MontserratSemiBold",
    textAlign: "center",
    color: colors.navyBlueClr,
    // lineHeight: 25,
  },
  subText1: {
    fontFamily: "MontserratSemiBold",
    textAlign: "center",
    fontSize: 20,
    textDecorationLine: "underline",
    color: colors.navyBlueClr,
  },
  passcode: {
    flex: 6,
    width: "100%",
    backgroundColor: colors.blueClr,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    alignItems: "center",
    justifyContent: "flex-start",
    // backgroundColor: "red",
  },
  Label: {
    fontSize: 22,
    color: colors.whiteClr,
    fontFamily: "MontserratSemiBold",
  },
  input: {
    paddingHorizontal: 30,
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginVertical: 20,
  },
  round: {
    backgroundColor: colors.whiteClr,
    height: Platform.OS === "ios" ? 60 : 65,
    width: Platform.OS === "ios" ? 60 : 65,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    margin: 15,
  },
  innerRound: {
    // backgroundColor: "red",
    borderRadius: 100,
    width: "70%",
    height: "70%",
    alignItems: "center",
    justifyContent: "center",
  },
  passcodeText: {
    textAlign: "center",
    fontFamily: "MontserratBold",
    color: "black",
    fontSize: 35,
  },
  hiddenDot: {
    width: 20,
    height: 20,
    borderRadius: 10, // Half of width/height for a circle
    backgroundColor: colors.greyClr,
  },
  NumberRow: {
    width: "100%",
    justifyContent: "space-around",
    flexDirection: "row",
    marginVertical: 15,
  },
  number: {
    alignItems: "center",
    justifyContent: "center",
    width: "30%",
  },
  numberText: {
    color: colors.whiteClr,
    fontSize: 35,
    fontFamily: "MontserratSemiBold",
  },
  secondRow: { width: "100%" },
  thirdRow: { width: "100%" },
  forthRow: { width: "100%" },
});
