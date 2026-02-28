import { fetchApi } from "@/lib/fetch-api";
import {
  IGetMedicinesParams,
  IMedicine,
  IMedicineResponse,
  IMedicinesResponse,
  IStockOperation,
} from "../medicine.type";

// For seller dashboard
export const getSellerMedicines = async (params?: IGetMedicinesParams) => {
  return fetchApi<IMedicinesResponse>("/api/v1/medicines/seller", {
    method: "GET",
    params: params as Record<string, string | number | boolean | undefined>,
  });
};

export const medicineService = {
  getAll: async (params?: IGetMedicinesParams) => {
    return fetchApi<IMedicinesResponse>("/api/v1/medicines", {
      method: "GET",
      params: params as Record<string, string | number | boolean | undefined>,
    });
  },

  getById: async (id: string) => {
    return fetchApi<IMedicineResponse>(`/api/v1/medicines/${id}`, {
      method: "GET",
    });
  },

  create: async (payload: Partial<IMedicine>) => {
    return fetchApi<IMedicine>("/api/v1/medicines", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  update: async (
    id: string,
    payload: Partial<IMedicine>,
    params?: {
      stockOperation?: IStockOperation;
      stockQuantity?: number;
      skipUpdateQuery?: boolean;
    },
  ) => {
    return fetchApi<IMedicine>(`/api/v1/medicines/${id}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
      params: params as Record<string, string | number | boolean | undefined>,
    });
  },

  delete: async (id: string) => {
    return fetchApi<IMedicine>(`/api/v1/medicines/${id}`, {
      method: "DELETE",
    });
  },
};
