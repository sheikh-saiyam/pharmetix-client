import { fetchApi } from "@/lib/fetch-api";
import {
  IAllOrdersResponse,
  IGetOrdersParams,
  IMyOrdersResponse,
  IOrderResponse,
  ISellerOrderItemsResponse,
  OrderItemStatus,
  OrderStatus,
  TCreateOrderPayload,
} from "../order.type";

export const orderService = {
  // CUSTOMER
  create: async (payload: TCreateOrderPayload) => {
    return fetchApi<IOrderResponse>("/api/v1/orders", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  // CUSTOMER
  getMyOrders: async (params?: {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
  }) => {
    return fetchApi<IMyOrdersResponse>("/api/v1/orders/customer", {
      method: "GET",
      params: params as Record<string, string | number | boolean | undefined>,
    });
  },

  getOrderById: async (id: string) => {
    return fetchApi<IOrderResponse>(`/api/v1/orders/${id}`, {
      method: "GET",
    });
  },

  // SELLER
  getSellerOrders: async (params?: IGetOrdersParams) => {
    return fetchApi<ISellerOrderItemsResponse>("/api/v1/orders/seller", {
      method: "GET",
      params: params as Record<string, string | number | boolean | undefined>,
    });
  },

  // CUSTOMER
  cancelOrder: async (id: string) => {
    return fetchApi<IOrderResponse>(`/api/v1/orders/cancel-order/${id}`, {
      method: "PATCH",
    });
  },

  // ADMIN
  updateOrder: async (orderId: string, status: OrderStatus) => {
    return fetchApi<IOrderResponse>(`/api/v1/orders/change-status/${orderId}`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });
  },

  // SELLER
  updateOrderItemStatus: async (itemId: string, status: OrderItemStatus) => {
    return fetchApi<IOrderResponse>(
      `/api/v1/orders/item/change-status/${itemId}`,
      {
        method: "PATCH",
        body: JSON.stringify({ status }),
      },
    );
  },

  // ADMIN
  getAllOrders: async (params?: IGetOrdersParams) => {
    return fetchApi<IAllOrdersResponse>("/api/v1/orders/all", {
      method: "GET",
      params: params as Record<string, string | number | boolean | undefined>,
    });
  },
};
