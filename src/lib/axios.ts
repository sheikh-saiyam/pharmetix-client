import axios from "axios";
import { env } from "@/env";
import { getServerCookies } from "./cookie/server-cookie";

export const axiosInstance = axios.create({
  baseURL: `${env.NEXT_PUBLIC_API_URL}/api/v1`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to automatically attach cookies on the server
axiosInstance.interceptors.request.use(
  async (config) => {
    // Only manually attach cookies if on the server
    // On the client, the browser handles it with withCredentials: true
    if (typeof window === "undefined") {
      const cookieString = await getServerCookies();
      if (cookieString) {
        config.headers.Cookie = cookieString;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor for global error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  },
);
