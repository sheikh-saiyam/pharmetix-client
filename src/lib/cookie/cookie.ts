import { getClientCookies } from "./client-cookie";
import { getServerCookies } from "./server-cookie";

/**
 * Extract cookies based on the environment
 */
export const getCookies = async () => {
  if (typeof window !== "undefined") {
    // On the client, cookies are handled automatically by withCredentials: true
    // but we can return them as a string if needed for manual headers
    const cookies = getClientCookies();
    return Object.entries(cookies)
      .map(([name, value]) => `${name}=${value}`)
      .join("; ");
  } else {
    return await getServerCookies();
  }
};
