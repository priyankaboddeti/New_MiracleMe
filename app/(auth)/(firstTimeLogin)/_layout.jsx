import { router, Stack } from "expo-router";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { colors } from "../../../constants/Colors";

export default function AuthLayout() {
  const isSignIn = useSelector((state) => state.auth.isSignIn);
  const isFingerprintEnabled = useSelector(
    (state) => state.auth.isFingerprintEnabled
  );

  // useEffect(() => {
  //   if (isFingerprintEnabled && router.pathname !== "/fingerprintSetup") {
  //     router.replace("/fingerprintSetup");
  //   } else if (isSignin && router.pathname !== "/passcodeSetup") {
  //     router.replace("/passcodeSetup");
  //   }
  // }, [isSignin, isFingerprintEnabled, router]);

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.blueClr,
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen
        name="passcodeSetup"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="fingerprintSetup"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
