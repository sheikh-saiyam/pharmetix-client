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

    const req = fetch("http://localhost:3000/api/v1/stats/admin", {
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore
          .getAll()
          .map((cookie) => `${cookie.name}=${cookie.value}`)
          .join("; "),
      },
    });
    return req;
  },
};
