import { axiosInstance } from "@/lib/axios";
import { IGetUsersParams, IGetUsersResponse } from "../types/user.type";

export const adminService = {
  getUsers: async (params?: IGetUsersParams) => {
    const { data } = await axiosInstance.get<IGetUsersResponse>("/users", {
      params,
    });
    return data;
  },

  updateUserStatus: async (
    userId: string,
    payload: { isActive?: boolean; role?: string },
  ) => {
    if (payload.isActive !== undefined) {
      const { data } = await axiosInstance.patch(`/users/${userId}/status`, {
        isActive: payload.isActive,
      });
      return data;
    }
    if (payload.role !== undefined) {
      const { data } = await axiosInstance.patch(`/users/${userId}/role`, {
        role: payload.role,
      });
      return data;
    }
  },

  deleteUser: async (userId: string) => {
    const { data } = await axiosInstance.delete(`/users/${userId}`);
    return data;
  },
};
