// API Configuration for PTM Portal
export const API_BASE_URL = "http://localhost:5000/api"; // Update with your actual API URL

// API Endpoints
export const API_ENDPOINTS = {
  LOGIN: "/login",
  REGISTER: "/register",
  DASHBOARD: "/dashboard",
  PROFILE: "/profile",
  ATTENDANCE: "/attendance",
  MESSAGES: "/messages",
  APPOINTMENTS: "/appointments",
  VERIFY_STUDENT: "/verify-student",
  SEND_OTP: "/send-otp",
  VERIFY_OTP: "/verify-otp"
};

// Default headers
export const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
};

// Get auth headers with token
export const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    ...DEFAULT_HEADERS,
    'Authorization': `Bearer ${token}`
  };
};
