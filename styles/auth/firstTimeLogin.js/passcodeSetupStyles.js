import { StyleSheet } from "react-native";
import {Colors,colors} from "../../../constants/Colors"

export default StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.whiteClr, // ✅ Used colors for consistency
      alignItems: "center",
      justifyContent: "center",
    },
    logoContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    WelcomeContainer: {
      flex: 1,
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-start",
    },
    WelcomeView: {
      flex: 1,
      alignItems: "center",
    },
    welcome: {
      color: colors.blueClr,
      fontSize: 25,
      fontFamily: "MontserratSemiBold",
      textAlign: "center",
    },
    subTextView: {
      flex: 0.8,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
    subText: {
      fontSize: 16,
      fontFamily: "MontserratSemiBold",
      textAlign: "center",
      color: colors.navyBlueClr,
    },
    passcode: {
        flex: 7,
        backgroundColor: "red",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
      },
      passcode: {
        flex: 6.5,
        alignItems: 'center',
        justifyContent: 'space-around',
      },
      Label: {
        fontSize:16,
        color: colors.whiteClr,
        fontFamily: 'Montserrat_500Medium',
      },
      input: {
        marginHorizontal: 10,
        marginTop: 10,
      },
      round: {
        width:40,
        height:40,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
      },
      hideText: {
        fontSize:24,
        color: colors.whiteClr,
      },
      passcodeText: {
        fontSize:24,
        color: colors.whiteClr,
      },
      NumberRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginTop: 10,
      },
      number: {
        width:70,
        height:70,
        borderRadius: 35,
        justifyContent: 'center',
        alignItems: 'center',
      },
      numberText: {
        fontSize:24,
        color: colors.whiteClr,
      },
  });