"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { medicineService } from "@/features/medicine/services/medicine.service";
import { toast } from "sonner";
import { axiosInstance } from "@/services/axios";

export const useSellerMedicines = () => {
  return useQuery({
    queryKey: ["seller-medicines"],
    queryFn: () => medicineService.getSellerMedicines(),
  });
};

export const useCreateMedicine = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: medicineService.create,
    onSuccess: () => {
      toast.success("Medicine created successfully");
      queryClient.invalidateQueries({ queryKey: ["seller-medicines"] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to create medicine");
    },
  });
};

export const useUpdateMedicine = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, payload }: { id: string; payload: any }) => {
      const { data } = await axiosInstance.patch(
        `/seller/medicines/${id}`,
        payload,
      );
      return data;
    },
    onSuccess: () => {
      toast.success("Medicine updated successfully");
      queryClient.invalidateQueries({ queryKey: ["seller-medicines"] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to update medicine");
    },
  });
};
