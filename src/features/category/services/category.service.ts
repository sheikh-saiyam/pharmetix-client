import { axiosInstance } from "@/lib/axios";
import { ICategoriesResponse } from "@/features/medicine/medicine.type";

export const categoryService = {
  getAll: async (params?: { limit?: number }) => {
    const { data } = await axiosInstance.get<ICategoriesResponse>(
      "/categories",
      {
        params,
      },
    );
    return data;
  },
};
