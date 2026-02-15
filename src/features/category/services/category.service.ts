import { axiosInstance } from "@/lib/axios";
import { CategoriesResponse } from "@/features/medicine/types";

export const categoryService = {
  getAll: async (params?: { limit?: number }) => {
    const { data } = await axiosInstance.get<CategoriesResponse>(
      "/categories",
      {
        params,
      },
    );
    return data;
  },
};
