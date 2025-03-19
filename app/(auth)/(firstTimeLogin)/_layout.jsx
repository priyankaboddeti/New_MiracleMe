import { router, Stack } from "expo-router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { colors } from "../../../constants/Colors";

export default function AuthLayout() {
  const isSignin = useSelector((state) => state.auth.isSignin);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true); // Ensure the component has mounted
  }, []);

  useEffect(() => {
    if (isMounted && isSignin && router.pathname !== "/passcodeSetup") {
      router.replace("/passcodeSetup");
    }
  }, [isMounted, isSignin]);

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
      {isSignin && (
        <Stack.Screen options={{ headerShown: false }} name="passcodeSetup" />
      )}
      {/* <Stack.Screen name="fingerprintSetup" /> */}
    </Stack>
  );
}
