import { axiosInstance } from "@/lib/axios";

export interface SellerStats {
  totalOrders: number;
  totalEarnings: number;
  lowStockMedicines: any[]; // Medicine[]
}

export interface AdminStats {
  // Define based on backend response if needed, docs don't specify structure but endpoint exists
  totalUsers: number;
  totalOrders: number;
  totalMedicines: number;
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
    const { data } = await axiosInstance.get<{
      success: boolean;
      data: AdminStats;
    }>("/stats/admin");
    return data;
  },
};
