import { axiosInstance } from "@/lib/axios";
import { IAdminStatsResponse, ISellerStatsResponse } from "../dashboard.type";

export const dashboardService = {
  getSellerStats: async () => {
    const { data } =
      await axiosInstance.get<ISellerStatsResponse>("/stats/seller");
    return data;
  },

  getAdminStats: async () => {
    const { data } =
      await axiosInstance.get<IAdminStatsResponse>("/stats/admin");
    return data;
  },
};
