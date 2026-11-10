import axios from "axios";

let authTokenGetter = null;

export const setAuthTokenGetter = (fn) => {
  authTokenGetter = fn;
};

export const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "development" ? "http://localhost:5000/api" : "/api",
  withCredentials: true,
});

axiosInstance.interceptors.request.use(async (config) => {
  try {
    let token = null;
    if (authTokenGetter) {
      token = await authTokenGetter();
    }
    if (!token && typeof window !== "undefined" && window.Clerk?.session) {
      token = await window.Clerk.session.getToken();
    }
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (error) {
    console.error("Error setting auth token:", error);
  }
  return config;
});
