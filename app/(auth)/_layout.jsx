import { Stack } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import * as SecureStore from "expo-secure-store";
import { signIn } from "../../services/redux/features/auth-slice";

export default function AuthLayout() {
  const dispatch = useDispatch();
  // const token = useSelector((state) => state.auth.token);

  // useEffect(() => {
  //   const loadToken = async () => {
  //     const token = await SecureStore.getItemAsync("token");
  //     if (token) {
  //       dispatch(signIn(token)); // Restore session if token exists
  //     }
  //   };
  //   loadToken();
  // }, []);

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#f4511e",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      {true ? (
        <Stack.Screen
          name="(firstTimeLogin)"
          options={{ headerShown: false }}
        />
      ) : (
        <Stack.Screen name="(secondTimeLogin)" />
      )}
    </Stack>
  );
}
