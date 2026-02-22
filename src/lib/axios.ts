import axios from "axios";
import { env } from "@/env";

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
    // Only manually attach cookies if on the server side.
    // On the client, the browser handles it automatically via withCredentials: true.
    //
    // We use headers() from next/headers to read the raw incoming "Cookie" header
    // and forward it verbatim. This is the most reliable approach on Vercel because:
    //   1. It forwards ALL cookies exactly as the browser sent them.
    //   2. It handles the __Secure- prefix used on HTTPS (Vercel production) automatically.
    //   3. It never fails silently — if there is no cookie header, we simply skip.
    if (typeof window === "undefined") {
      try {
        const { headers } = await import("next/headers");
        const headersList = await headers();
        const cookieHeader = headersList.get("cookie");
        if (cookieHeader) {
          config.headers.set("Cookie", cookieHeader);
        }
      } catch {
        // headers() is only available within a Next.js request context.
        // During static generation or build time this will throw — safe to ignore.
      }
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor for global error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error),
);
