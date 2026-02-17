"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { orderService } from "@/features/order/services/order.service";
import { IGetOrdersParams, OrderStatus } from "../order.type";
import { toast } from "sonner";

export const useMyOrders = (params?: {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}) => {
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

export const useAllOrders = (params?: IGetOrdersParams) => {
  return useQuery({
    queryKey: ["all-orders", params],
    queryFn: () => orderService.getAllOrders(params),
  });
};

export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      orderId,
      status,
    }: {
      orderId: string;
      status: OrderStatus;
    }) => orderService.updateOrder(orderId, status),
    onSuccess: (data) => {
      toast.success(data?.message || "Order status updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["all-orders"] });
      queryClient.invalidateQueries({ queryKey: ["order"] });
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Failed to update order status",
      );
    },
  });
};
