import { ICategoriesResponse } from "@/features/medicine/medicine.type";
import { fetchApi } from "@/lib/fetch-api";

export const categoryService = {
  getAll: async (params?: {
    page?: number;
    limit?: number;
    search?: string;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
  }) => {
    return fetchApi<ICategoriesResponse>("/api/v1/categories", {
      method: "GET",
      params,
    });
  },
};
