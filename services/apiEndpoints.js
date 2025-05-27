// Make sure this is properly defined with a fallback
const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL;
console.log("API_BASE_URL:", API_BASE_URL);

const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "employee/login",
    RESET_PASSWORD: "employees/reset-my-password",
  },
  // Rest of your endpoints...
};

export { API_BASE_URL, API_ENDPOINTS };
