"use client";

import { useQuery } from "@tanstack/react-query";
import { categoryService } from "../services/category.service";

export const useCategories = (params?: { limit?: number }) => {
  return useQuery({
    queryKey: ["categories", params],
    queryFn: () => categoryService.getAll(params),
  });
};
