"use client";

import { useQuery } from "@tanstack/react-query";
import { categoryService } from "../services/category.service";

import { IGetCategoriesParams } from "../types/category.type";

export const useCategories = (params?: IGetCategoriesParams) => {
  return useQuery({
    queryKey: ["categories", params],
    queryFn: () => categoryService.getAll(params),
  });
};
