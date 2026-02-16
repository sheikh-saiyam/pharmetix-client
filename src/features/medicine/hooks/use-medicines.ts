"use client";

import { useQuery } from "@tanstack/react-query";
import { IGetMedicinesParams } from "../medicine.type";
import { medicineService } from "../services/medicine.service";

export const useMedicines = (params?: IGetMedicinesParams) => {
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
