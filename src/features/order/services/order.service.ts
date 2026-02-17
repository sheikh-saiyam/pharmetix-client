import { axiosInstance } from "@/lib/axios";
import {
  IGetOrdersParams,
  IMyOrdersResponse,
  IAllOrdersResponse,
  IOrderResponse,
  ISellerOrderItemsResponse,
  OrderItemStatus,
  OrderStatus,
  TCreateOrderPayload,
} from "../order.type";

export const orderService = {
  // CUSTOMER
  create: async (payload: TCreateOrderPayload) => {
    const { data } = await axiosInstance.post("/orders", payload);
    return data;
  },

  // CUSTOMER
  getMyOrders: async (params?: {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
  }) => {
    const { data } = await axiosInstance.get<IMyOrdersResponse>(
      "/orders/customer",
      { params },
    );
    return data;
  },

  getOrderById: async (id: string) => {
    const { data } = await axiosInstance.get<IOrderResponse>(`/orders/${id}`);
    return data;
  },

  // SELLER
  getSellerOrders: async (params?: IGetOrdersParams) => {
    const { data } = await axiosInstance.get<ISellerOrderItemsResponse>(
      "/orders/seller",
      { params },
    );
    return data;
  },

  // CUSTOMER
  cancelOrder: async (id: string) => {
    const { data } = await axiosInstance.patch(`/orders/cancel-order/${id}`, {
      status: OrderStatus.CANCELLED,
    });
    return data;
  },

  // ADMIN
  updateOrder: async (orderId: string, status: OrderStatus) => {
    const { data } = await axiosInstance.patch(
      `/orders/change-status/${orderId}`,
      {
        status,
      },
    );
    return data;
  },

  // SELLER
  updateOrderItemStatus: async (itemId: string, status: OrderItemStatus) => {
    const { data } = await axiosInstance.patch(
      `/orders/item/change-status/${itemId}`,
      { status },
    );
    return data;
  },

  // ADMIN
  getAllOrders: async (params?: IGetOrdersParams) => {
    const { data } = await axiosInstance.get<IAllOrdersResponse>(
      "/orders/all",
      { params },
    );
    return data;
  },
};
