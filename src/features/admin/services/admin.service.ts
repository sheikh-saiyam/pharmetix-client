import { fetchApi } from "@/lib/fetch-api";
import { IGetUsersParams } from "../types/user.type";

export const adminService = {
  getUsers: async (params?: IGetUsersParams) => {
    return fetchApi("/api/v1/users", {
      method: "GET",
      params: params as Record<string, string | number | boolean | undefined>,
    });
  },

  updateUser: async (
    userId: string,
    payload: { isActive?: boolean; role?: string },
  ) => {
    if (payload.isActive !== undefined) {
      return fetchApi(`/api/v1/users/${userId}/status`, {
        method: "PATCH",
        body: JSON.stringify({ isActive: payload.isActive }),
      });
    }
    if (payload.role !== undefined) {
      return fetchApi(`/api/v1/users/${userId}/role`, {
        method: "PATCH",
        body: JSON.stringify({ role: payload.role }),
      });
    }
  },

  deleteUser: async (userId: string) => {
    return fetchApi(`/api/v1/users/${userId}`, {
      method: "DELETE",
    });
  },
};
