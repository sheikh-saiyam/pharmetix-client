import axios, { AxiosInstance } from "axios";
import { env } from "@/env";

/**
 * Create axios instance that works for:
 * - Server Components / API routes (pass cookie explicitly)
 * - Client Components (browser sends cookie automatically)
 *
 * @param cookie Optional cookie string from server request headers
 */
export const createAxiosInstance = (cookie?: string): AxiosInstance => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  // Only add cookie if running on server or cookie is provided
  if (typeof window === "undefined" && cookie) {
    headers["Cookie"] = cookie;
  }

  return axios.create({
    baseURL: `${env.NEXT_PUBLIC_API_URL}/api/v1`,
    withCredentials: true, // required for sending cookies
    headers,
  });
};

// Default instance for client-side usage
export const axiosInstance = createAxiosInstance();

// Global response interceptor for error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  },
);
