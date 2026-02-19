/**
 * Extract cookies for server-side using next/headers
 */
export const getServerCookies = async () => {
  if (typeof window !== "undefined") return "";
  try {
    const { cookies } = await import("next/headers");
    const cookieStore = await cookies();
    return cookieStore
      .getAll()
      .map((cookie) => `${cookie.name}=${cookie.value}`)
      .join("; ");
  } catch (error) {
    console.error("Error fetching server cookies:", error);
    return "";
  }
};
