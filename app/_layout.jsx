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
import Toast, { ToastProvider } from "../utils/Toast/ToastContext";
import { setupTokenRefreshTimer } from "../services/tokenManager";
import { rehydrateAuth } from "../services/redux/rehydrateAuth";

import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const dispatch = useDispatch();
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    MontserratRegular: require("../assets/fonts/Montserrat-Regular.ttf"),
    MontserratMedium: require("../assets/fonts/Montserrat-Medium.ttf"),
    MontserratSemiBold: require("../assets/fonts/Montserrat-SemiBold.ttf"),
    MontserratBold: require("../assets/fonts/Montserrat-Bold.ttf"),
  });

  // Toast configuaration
  // const [toastVisible, setToastVisible] = useState(false);
  // const [toastMessage, setToastMessage] = useState("");
  // const [toastType, setToastType] = useState("success");

  // const showToast = (message, type) => {
  //   setToastMessage(message);
  //   setToastType(type);
  //   setToastVisible(true);
  // };

  // const hideToast = () => {
  //   setToastVisible(false);
  // };

  // // Making showToast globally available (optional, but often helpful)
  // global.showToast = showToast;

  useEffect(() => {
    const cleanupTokenRefresh = initializeTokenRefresh();
    rehydrateAuth(dispatch); // 👈 rehydrate here

    return () => {
      cleanupTokenRefresh(); // Clean up on unmount
    };
  }, []);

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
          <SafeAreaView
            style={{ flex: 1, backgroundColor: "#fff" }}
            edges={["left", "right", "top", "bottom"]}
          >
            {/* <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}> */}
            <ToastProvider>
              <Stack>
                <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                {/* <Stack.Screen
                  name="(dashboard)"
                  options={{ headerShown: false }}
                /> */}
                {/* <Stack.Screen name="+not-found" /> */}
              </Stack>
              <StatusBar style="auto" />
              {/* </ThemeProvider> */}
            </ToastProvider>
          </SafeAreaView>
        </SafeAreaProvider>
      </PaperProvider>
    </Provider>
  );
}
