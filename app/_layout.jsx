import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Provider, useDispatch } from "react-redux";
import { store, initializeTokenRefresh } from "../services/redux/store";
import { PaperProvider } from "react-native-paper";
import { ToastProvider } from "../utils/Toast/ToastContext";
import { setupTokenRefreshTimer } from "../services/tokenManager";
import { rehydrateAuth } from "../services/redux/rehydrateAuth";

import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    MontserratRegular: require("../assets/fonts/Montserrat-Regular.ttf"),
    MontserratMedium: require("../assets/fonts/Montserrat-Medium.ttf"),
    MontserratSemiBold: require("../assets/fonts/Montserrat-SemiBold.ttf"),
    MontserratBold: require("../assets/fonts/Montserrat-Bold.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <PaperProvider>
        <SafeAreaProvider>
          {/* <SafeAreaView
            style={{ flex: 1, backgroundColor: "#fff" }}
            edges={["left", "right", "top", "bottom"]}
          > */}
          <ToastProvider>
            <AppContent />
            <StatusBar style="auto" translucent={false} />
          </ToastProvider>
          {/* </SafeAreaView> */}
        </SafeAreaProvider>
      </PaperProvider>
    </Provider>
  );
}

function AppContent() {
  const dispatch = useDispatch();

  useEffect(() => {
    const cleanupTokenRefresh = initializeTokenRefresh();

    // Correctly dispatch the thunk
    dispatch(rehydrateAuth());

    console.log("🔄 Dispatched rehydrateAuth thunk");

    return () => {
      cleanupTokenRefresh(); // Clean up on unmount
    };
  }, [dispatch]);

  return (
    <Stack>
      {/* <Stack.Screen name="(auth)" options={{ headerShown: false }} /> */}
      <Stack.Screen name="(dashboard)" options={{ headerShown: false }} />
      {/* <Stack.Screen name="+not-found" /> */}
    </Stack>
  );
}
