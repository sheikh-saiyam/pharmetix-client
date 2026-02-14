"use client";

import { useQuery } from "@tanstack/react-query";
import { medicineService } from "../services/medicine.service";

export const useMedicines = (params?: {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: string;
}) => {
  return useQuery({
    queryKey: ["medicines", params],
    queryFn: () => medicineService.getAll(params),
  });
};

export const useMedicine = (id: string) => {
  return useQuery({
    queryKey: ["medicine", id],
    queryFn: () => medicineService.getById(id),
    enabled: !!id,
  });
};
