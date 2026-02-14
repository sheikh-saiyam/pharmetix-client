"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { orderService } from "@/features/order/services/order.service";
import { toast } from "sonner";

export const useSellerOrders = (params?: { status?: string }) => {
  return useQuery({
    queryKey: ["seller-orders", params],
    queryFn: () => orderService.getSellerOrders(params),
  });
};

export const useUpdateOrderItemStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ itemId, status }: { itemId: string; status: string }) =>
      orderService.updateOrderItemStatus(itemId, status),
    onSuccess: () => {
      toast.success("Order status updated");
      queryClient.invalidateQueries({ queryKey: ["seller-orders"] });
      queryClient.invalidateQueries({ queryKey: ["seller-stats"] }); // Stats might change
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to update status");
    },
  });
};
