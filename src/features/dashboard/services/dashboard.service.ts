import { axiosInstance } from "@/lib/axios";
import { IAdminStatsResponse } from "../dashboard.type";

export interface SellerStats {
  totalOrders: number;
  totalEarnings: number;
  lowStockMedicines: any[]; // Medicine[]
}

export const dashboardService = {
  getSellerStats: async () => {
    const { data } = await axiosInstance.get<{
      success: boolean;
      data: SellerStats;
    }>("/stats/seller");
    return data;
  },

  getAdminStats: async () => {
    const { data } =
      await axiosInstance.get<IAdminStatsResponse>("/stats/admin");
    return data;
  },
};
