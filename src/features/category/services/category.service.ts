import { axiosInstance } from "@/lib/axios";
import { ICategoriesResponse } from "@/features/medicine/medicine.type";

export const categoryService = {
  getAll: async (params?: {
    page?: number;
    limit?: number;
    search?: string;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
  }) => {
    const { data } = await axiosInstance.get<ICategoriesResponse>(
      "/categories",
      {
        params,
      },
    );
    return data;
  },
};
