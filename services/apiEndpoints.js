const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL; // Change this
console.log(API_BASE_URL, "API_BASE_URL");

const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "employee/login",
    RESET_PASSWORD: "employees/reset-my-password",
  },
  EMPLOYEE: {
    SEARCH: "employee/search",
    APPLY_LEAVE: "employee/leave",
    DEPARTMENTS_LOCATIONS: "employee/departments-locations-designations",
  },
  PROFILE: {
    UPDATE_PICTURE:
      "https://www.miraclesoft.com/webroot-api/employee-profile-pic-update",
  },
};

export { API_BASE_URL, API_ENDPOINTS };
