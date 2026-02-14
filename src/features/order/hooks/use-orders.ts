"use client";

import { useQuery } from "@tanstack/react-query";
import { orderService } from "@/features/order/services/order.service";

export const useMyOrders = (params?: { limit?: number }) => {
  return useQuery({
    queryKey: ["my-orders", params],
    queryFn: () => orderService.getMyOrders(params),
  });
};

export const useOrder = (id: string) => {
  return useQuery({
    queryKey: ["order", id],
    queryFn: () => orderService.getOrderById(id),
    enabled: !!id,
  });
};
