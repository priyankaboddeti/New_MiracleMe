import { router, Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function AuthLayout() {
  const isSignin = useSelector((state) => state.auth.isSignin);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true); // Ensure the component has mounted
  }, []);

  useEffect(() => {
    if (isMounted && isSignin && router.pathname !== '/passcodeSetup') {
      router.replace('/passcodeSetup');
    }
  }, [isMounted, isSignin]);

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
        headerShown:false
      }}>
        <Stack.Screen name="index" />
      {isSignin && <Stack.Screen name="passcodeSetup"  />}
      {/* <Stack.Screen name="fingerprintSetup" /> */}
    </Stack>
  );
}
