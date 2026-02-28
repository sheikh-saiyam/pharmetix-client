import { fetchApi } from "@/lib/fetch-api";
import { IGetUsersParams, IGetUsersResponse } from "../types/user.type";
import { UserStatus } from "@/types/user.type";

export const adminService = {
  getUsers: async (params?: IGetUsersParams) => {
    return fetchApi<IGetUsersResponse>("/api/v1/users", {
      method: "GET",
      params: params as Record<string, string | number | boolean | undefined>,
    });
  },

  updateUser: async (userId: string, payload: { status: UserStatus }) => {
    return fetchApi<{ message: string }>(`/api/v1/users/status/${userId}`, {
      method: "PATCH",
      body: JSON.stringify({ status: payload.status }),
    });
  },
};
