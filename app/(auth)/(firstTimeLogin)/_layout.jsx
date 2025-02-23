import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
        <Stack.Screen name="index"  options={{ headerShown: false }}/>
      {/* <Stack.Screen name="passcodeSetup"  />
      <Stack.Screen name="fingerprintSetup" /> */}
    </Stack>
  );
}
