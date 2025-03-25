import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3005/",
  withCredentials: true, // Ensures cookies (JWT token) are sent with requests
});

//Handle expired tokens and redirect to login if refresh fails
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await api.get("http://localhost:3005/auth/refresh");
        return api(originalRequest); // Retry the original request
      } catch (refreshError) {
        console.error("Session expired");
        navigate("/login");
      }
    }
    return Promise.reject(error);
  }
);

export default api;
