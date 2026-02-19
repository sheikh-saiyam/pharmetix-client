import Cookies from "js-cookie";

/**
 * Extract cookies for client-side using js-cookie
 */
export const getClientCookies = () => {
  return Cookies.get();
};
