"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { medicineService } from "@/features/medicine/services/medicine.service";
import { toast } from "sonner";
import { IGetMedicinesParams, IMedicine } from "../medicine.type";

export const useSellerMedicines = (params?: IGetMedicinesParams) => {
  return useQuery({
    queryKey: ["seller-medicines", params],
    queryFn: () => medicineService.getSellerMedicines(params),
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
    onError: (error) => {
      toast.error(
        (error as { response?: { data?: { message?: string } } }).response?.data
          ?.message || "Failed to create medicine",
      );
    },
  });
};

export const useUpdateMedicine = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: Partial<IMedicine>;
    }) => medicineService.update(id, payload),
    onSuccess: () => {
      toast.success("Medicine updated successfully");
      queryClient.invalidateQueries({ queryKey: ["seller-medicines"] });
    },
    onError: (error) => {
      toast.error(
        (error as { response?: { data?: { message?: string } } }).response?.data
          ?.message || "Failed to update medicine",
      );
    },
  });
};

export const useDeleteMedicine = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: medicineService.delete,
    onSuccess: () => {
      toast.success("Medicine deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["seller-medicines"] });
    },
    onError: (error) => {
      toast.error(
        (error as { response?: { data?: { message?: string } } }).response?.data
          ?.message || "Failed to delete medicine",
      );
    },
  });
};
