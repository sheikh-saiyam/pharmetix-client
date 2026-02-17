"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { orderService } from "@/features/order/services/order.service";
import { toast } from "sonner";

import { IGetOrdersParams, OrderItemStatus } from "../order.type";

export const useSellerOrders = (params?: IGetOrdersParams) => {
  return useQuery({
    queryKey: ["seller-orders", params],
    queryFn: () => orderService.getSellerOrders(params),
  });
};

export const useUpdateOrderItemStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      itemId,
      status,
    }: {
      itemId: string;
      status: OrderItemStatus;
    }) => orderService.updateOrderItemStatus(itemId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["seller-orders"] });
      queryClient.invalidateQueries({ queryKey: ["seller-stats"] });
    },
    onError: (error: unknown) => {
      toast.error(
        (error as { response?: { data?: { message?: string } } }).response?.data
          ?.message || "Failed to update status",
      );
    },
  });
};
