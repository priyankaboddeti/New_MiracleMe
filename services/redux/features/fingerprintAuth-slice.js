import { createSlice } from "@reduxjs/toolkit";
import * as LocalAuthentication from "expo-local-authentication";

const initialState = {
  isFingerprintAuthEnabled: false,
  isFingerprintAuthAvailable: false,
  fingerprintAuthError: null,
};

const fingerprintAuthSlice = createSlice({
  name: "fingerprintAuth",
  initialState,
  reducers: {
    setFingerprintAuthEnabled: (state, action) => {
      state.isFingerprintAuthEnabled = action.payload;
    },
    setFingerprintAuthAvailable: (state, action) => {
      state.isFingerprintAuthAvailable = action.payload;
    },
    setFingerprintAuthError: (state, action) => {
      state.fingerprintAuthError = action.payload;
    },
  },
});

export const {
  setFingerprintAuthEnabled,
  setFingerprintAuthAvailable,
  setFingerprintAuthError,
} = fingerprintAuthSlice.actions;

export const checkFingerprintAvailability = () => async (dispatch) => {
  try {
    const isHardwareAvailable = await LocalAuthentication.hasHardwareAsync();
    const enrolledBiometrics = await LocalAuthentication.isEnrolledAsync();

    dispatch(
      setFingerprintAuthAvailable(isHardwareAvailable && enrolledBiometrics)
    );
  } catch (error) {
    dispatch(setFingerprintAuthError(error.message));
  }
};

export const authenticateWithFingerprint = () => async (dispatch) => {
  try {
    const result = await LocalAuthentication.authenticateAsync();
    console.log(result, "result");
    if (result.success) {
      console.log(result, "result");
      dispatch(setFingerprintAuthEnabled(true));
      return true; // Authentication successful
    } else {
      dispatch(setFingerprintAuthEnabled(false));
      return false; // Authentication failed
    }
  } catch (error) {
    dispatch(setFingerprintAuthError(error.message));
    return false; // Authentication error
  }
};

export default fingerprintAuthSlice.reducer;
