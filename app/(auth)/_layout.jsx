import { Stack, useRouter } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import * as SecureStore from "expo-secure-store";
import { signIn } from "../../services/redux/features/auth-slice";
import { useEffect, useState } from "react";

export default function AuthLayout() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isFirstTime, setIsFirstTime] = useState(true);

  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync("token");
      if (token) {
        dispatch(signIn(token));
        setIsFirstTime(false);
        router.replace("/(auth)/(secondTimeLogin)");
      }
    };
    loadToken();
  }, [dispatch]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(firstTimeLogin)" options={{ headerShown: false }} />
      <Stack.Screen name="(secondTimeLogin)" options={{ headerShown: false }} />
    </Stack>
  );
}
