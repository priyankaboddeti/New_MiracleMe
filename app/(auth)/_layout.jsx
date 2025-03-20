import { Stack, useRouter } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import * as SecureStore from "expo-secure-store";
import { signIn } from "../../services/redux/features/auth-slice";
import { useEffect, useState } from "react";

export default function AuthLayout() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isFirstTime, setIsFirstTime] = useState(true); // Default to first time, adjust logic

  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync("token");
      if (token) {
        dispatch(signIn(token));
        setIsFirstTime(false); // Token exists, not first time
      }
    };
    loadToken();
  }, [dispatch]);

  return (
    <Stack
      screenOptions={{ headerShown: false }}
      // screenOptions={{
      //   headerStyle: {
      //     backgroundColor: "#f4511e",
      //   },
      //   headerTintColor: "#fff",
      //   headerTitleStyle: {
      //     fontWeight: "bold",
      //   },
      // }}
    >
      {isFirstTime ? (
        <>
          <Stack.Screen
            name="(firstTimeLogin)"
            options={{ headerShown: false }}
          />
          <Stack.Screen name="dashboard" options={{ headerShown: false }} />
        </>
      ) : (
        <Stack.Screen name="(secondTimeLogin)" />
      )}
    </Stack>
  );
}
