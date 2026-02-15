import { axiosInstance } from "@/lib/axios";

export const adminService = {
  getUsers: async (params?: {
    page?: number;
    limit?: number;
    role?: string;
  }) => {
    const { data } = await axiosInstance.get("/users", { params });
    return data;
  },

  updateUserStatus: async (
    userId: string,
    payload: { isActive?: boolean; role?: string },
  ) => {
    // Endpoint might be /users/:id/status or PATCH /users/:id
    // Docs: 5. Update User Status (Admin) -> PATCH /api/v1/users/:userId/status body: { isActive: boolean }
    // Docs: 6. Update User Role (Admin) -> PATCH /api/v1/users/:userId/role body: { role: string }
    // I'll make separate methods or one depending on payload.
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
