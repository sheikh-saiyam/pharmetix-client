import { axiosInstance } from "@/lib/axios";
import {
  IGetMedicinesParams,
  IMedicine,
  IMedicineResponse,
  IMedicinesResponse,
} from "../medicine.type";

export const medicineService = {
  getAll: async (params?: IGetMedicinesParams) => {
    const { data } = await axiosInstance.get<IMedicinesResponse>("/medicines", {
      params,
    });
    return data;
  },

  getById: async (id: string) => {
    const { data } = await axiosInstance.get<IMedicineResponse>(
      `/medicines/${id}`,
    );
    return data;
  },

  // For seller dashboard
  getSellerMedicines: async (params?: IGetMedicinesParams) => {
    const { data } = await axiosInstance.get<IMedicinesResponse>(
      "/medicines/seller",
      {
        params,
      },
    );
    return data;
  },

  create: async (payload: Partial<IMedicine>) => {
    const { data } = await axiosInstance.post("/seller/medicines", payload);
    return data;
  },

  update: async (id: string, payload: Partial<IMedicine>) => {
    const { data } = await axiosInstance.patch(`/medicines/${id}`, payload);
    return data;
  },

  delete: async (id: string) => {
    const { data } = await axiosInstance.delete(`/medicines/${id}`);
    return data;
  },
};
