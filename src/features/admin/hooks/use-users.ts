"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminService } from "@/features/admin/services/admin.service";
import { toast } from "sonner";
import { IGetUsersParams } from "../types/user.type";
import { UserStatus } from "@/types/user.type";

export const useUsers = (params?: IGetUsersParams) => {
  return useQuery({
    queryKey: ["users", params],
    queryFn: () => adminService.getUsers(params),
  });
};

export const useUpdateUserStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ userId, status }: { userId: string; status: UserStatus }) =>
      adminService.updateUser(userId, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      toast.error(
        (error as { response?: { data?: { message?: string } } }).response?.data
          ?.message || "Failed to update status",
      );
    },
  });
};
