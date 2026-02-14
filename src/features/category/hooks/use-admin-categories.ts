"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { categoryService } from "@/features/category/services/category.service"; // Need to update service to include mutations
import { toast } from "sonner";
import { axiosInstance } from "@/services/axios";

// Update service inline or in separate file? I'll extend the hook to call axios directly for now if service is read-only
// Actually better to update service. I'll update service first in next step or here?
// I'll update category.service.ts first.

// Wait, I can't update service in this tool call sequence easily without multiple artifacts.
// I'll define mutations here calling axios directly for speed, or better, just append to service file.
// I'll use axios directly in hooks for mutations to save a file edit, or better, just create `admin-category.service.ts`?
// No, standard `category.service.ts` is fine. I'll update it first.

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: { name: string; image?: string }) => {
      const { data } = await axiosInstance.post("/categories", payload);
      return data;
    },
    onSuccess: () => {
      toast.success("Category created");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (error: any) =>
      toast.error(error.response?.data?.message || "Failed to create"),
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      payload,
    }: {
      id: string;
      payload: { name?: string; image?: string };
    }) => {
      const { data } = await axiosInstance.patch(`/categories/${id}`, payload);
      return data;
    },
    onSuccess: () => {
      toast.success("Category updated");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (error: any) =>
      toast.error(error.response?.data?.message || "Failed to update"),
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await axiosInstance.delete(`/categories/${id}`);
      return data;
    },
    onSuccess: () => {
      toast.success("Category deleted");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (error: any) =>
      toast.error(error.response?.data?.message || "Failed to delete"),
  });
};
