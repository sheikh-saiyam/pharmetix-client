import { fetchApi } from "@/lib/fetch-api";
import { IAdminStatsResponse, ISellerStatsResponse } from "../dashboard.type";

export const getSellerStats = async () => {
  return fetchApi<ISellerStatsResponse>("/api/v1/stats/seller", {
    method: "GET",
  });
};

export const getAdminStats = async () => {
  return fetchApi<IAdminStatsResponse>("/api/v1/stats/admin", {
    method: "GET",
  });
};

export const dashboardService = {
  getSellerStats,
  getAdminStats,
};
