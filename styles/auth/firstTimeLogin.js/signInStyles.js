import { StyleSheet } from "react-native";
import {Colors,colors} from "../../../constants/Colors"

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.whiteClr,
  },
  logoContainer: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    flex: 1,
    alignItems: "center",
    width: "100%",
  },
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor:colors.blueClr,
    borderRadius: 50,
    width: "80%",
    paddingHorizontal: 20,
    paddingVertical: 5,
    marginVertical: 10,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    top:2,
    color: "white",
    fontSize: 18,
    fontFamily: "MontserratSemiBold",
  },
  signInButton: {
    width: "30%",
    backgroundColor: colors.navyBlueClr,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 12,
    marginTop: 20,
  },
  signInText: {
    color: "white",
    fontSize: 20,
    fontFamily: "MontserratMedium",
  },
  background: {
    flex: 1,
    justifyContent: "flex-end",
    width: "100%",
    backgroundColor: colors.whiteClr,
  },
  dialogContainer: {
    backgroundColor: colors.whiteClr,
    borderRadius: 12,
    padding: 15,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  dialogTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#D32F2F",
    textAlign: "center",
  },
  dialogText: {
    fontSize: 16,
    textAlign: "center",
    color: "#333",
  },
  tryAgainButton: {
    backgroundColor:colors.navyBlueClr,
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
});
