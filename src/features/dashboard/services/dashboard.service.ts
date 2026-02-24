import { IAdminStatsResponse, ISellerStatsResponse } from "../dashboard.type";

export const getSellerStats = async () => {
  const response = await fetch("/api/v1/stats/seller", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch seller stats: ${response.statusText}`);
  }

  const data: ISellerStatsResponse = await response.json();
  return data;
};

export const getAdminStats = async () => {
  const response = await fetch("/api/v1/stats/admin", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch admin stats: ${response.statusText}`);
  }

  const data: IAdminStatsResponse = await response.json();

  return data;
};

export const dashboardService = {
  getSellerStats,
  getAdminStats,
};
