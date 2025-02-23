import { StyleSheet } from "react-native";

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
    backgroundColor: "#00AAE3",
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
    backgroundColor: "#0D416B",
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
    backgroundColor: "#fff",
  },
  dialogContainer: {
    backgroundColor: "#fff",
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
    backgroundColor: "#0D416B",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
});
