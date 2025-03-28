import axios from "axios";
import { useNavigate } from "react-router-dom";

// Setup Axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Base URL from environment variable
  withCredentials: true, // Ensures cookies (JWT token) are sent with requests
});

// Handle expired tokens and refresh logic
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const navigate = useNavigate();
    const originalRequest = error.config;

    // If unauthorized and not retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // Attempt to refresh token
        await api.get("auth/refresh");
        return api(originalRequest); // Retry original request
      } catch (refreshError) {
        console.error("Session expired. Redirecting to login.");
        localStorage.removeItem("token"); // Clear old token
        navigate("/login");
      }
    }
    return Promise.reject(error);
  }
);

// API functions

// Add transaction function
export const addTransaction = async (data) => {
  try {
    const response = await api.post("transactions", data);
    return response.data;
  } catch (error) {
    console.error("Error adding transaction:", error);
    throw error;
  }
};

// Add budget function
export const addBudget = async (data) => {
  try {
    const response = await api.post("budgets", data);
    return response.data;
  } catch (error) {
    console.error("Error adding budget:", error);
    throw error;
  }
};

// Fetch transactions function
export const getTransactions = async () => {
  try {
    const response = await api.get("transactions");
    return response.data;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw error;
  }
};

export default api;
