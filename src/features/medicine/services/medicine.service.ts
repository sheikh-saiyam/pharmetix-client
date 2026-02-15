import { axiosInstance } from "@/lib/axios";
import { Medicine, MedicineResponse, MedicinesResponse } from "../types";

export const medicineService = {
  getAll: async (params?: {
    page?: number;
    limit?: number;
    search?: string;
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    sort?: string;
  }) => {
    const { data } = await axiosInstance.get<MedicinesResponse>("/medicines", {
      params,
    });
    return data;
  },

  getById: async (id: string) => {
    const { data } = await axiosInstance.get<MedicineResponse>(
      `/medicines/${id}`,
    );
    return data;
  },

  // For seller dashboard
  getSellerMedicines: async (params?: any) => {
    const { data } = await axiosInstance.get<MedicinesResponse>("/medicines", {
      params,
    });
    return data;
  },

  create: async (payload: Partial<Medicine>) => {
    const { data } = await axiosInstance.post("/seller/medicines", payload);
    return data;
  },
};
