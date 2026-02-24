import { axiosInstance } from "@/lib/axios";
import { IAdminStatsResponse, ISellerStatsResponse } from "../dashboard.type";

export const dashboardService = {
  getSellerStats: async () => {
    const { data } =
      await axiosInstance.get<ISellerStatsResponse>("/stats/seller");
    return data;
  },

  getAdminStats: async () => {
    const { cookies } = await import("next/headers");
    const cookieStore = await cookies();

    const response = await fetch(`/api/v1/stats/admin`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(), // Simplified cookie passing
      },
      // next: { revalidate: 60 }, // Optional: Next.js caching
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch admin stats: ${response.statusText}`);
    }

    return response.json();
  },
};
