// import axios from "axios";
// import { env } from "@/env";
// import { getCookies } from "./cookie/cookie";

// export const axiosInstance = axios.create({
//   baseURL: `${env.NEXT_PUBLIC_API_URL}/api/v1`,
//   withCredentials: true, // MUST be true for the browser to send cookies automatically
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// axiosInstance.interceptors.request.use(
//   async (config) => {
//     // ONLY manually attach cookies if we are on the SERVER
//     if (typeof window === "undefined") {
//       const cookieString = await getCookies();

//       if (cookieString) {
//         // Axios 1.x+ prefers .set() for header safety
//         config.headers.set("Cookie", cookieString);
//       }
//     }

//     // On the CLIENT (window !== undefined), we do NOTHING.
//     // The browser sees 'withCredentials: true' and attaches cookies from its own store.

//     return config;
//   },
//   (error) => Promise.reject(error)
// );

import axios from "axios";
import { env } from "@/env";

export const axiosInstance = axios.create({
  baseURL: `${env.NEXT_PUBLIC_API_URL}/api/v1`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Response interceptor for global error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  },
);
