import { axiosInstance } from "@/lib/axios";
// import { OrderResponse, CreateOrderPayload } from "../types"; // Will define types inline or in separate file

export interface OrderItemPayload {
  medicineId: string;
  quantity: number;
}

export interface CreateOrderPayload {
  shippingName: string;
  shippingPhone: string;
  shippingAddress: string;
  shippingCity: string;
  shippingPostalCode: string;
  orderItems: OrderItemPayload[];
}

export const orderService = {
  create: async (payload: CreateOrderPayload) => {
    const { data } = await axiosInstance.post("/orders", payload);
    return data;
  },

  getMyOrders: async (params?: { limit?: number }) => {
    const { data } = await axiosInstance.get("/orders/customer", { params });
    return data;
  },

  getOrderById: async (id: string) => {
    const { data } = await axiosInstance.get(`/orders/${id}`);
    return data;
  },

  // Seller
  getSellerOrders: async (params?: { status?: string }) => {
    const { data } = await axiosInstance.get("/orders/seller", { params });
    return data;
  },

  updateOrderItemStatus: async (itemId: string, status: string) => {
    const { data } = await axiosInstance.patch(
      `/seller/orders/${itemId}/status`,
      { status },
    );
    return data;
  },

  // Admin
  getAllOrders: async (params?: { page?: number; limit?: number }) => {
    // Standard admin endpoint might be different? Docs say "View all orders". Endpoint: /admin/orders? Or just /orders/all?
    // Docs: 10 ADMIN CAPABILITIES - Global View: Can see ALL orders.
    // API: /orders/all?status=CANCELLED in Postman?
    // Doc: 7. Get All Orders in Postman -> /api/v1/orders/all
    const { data } = await axiosInstance.get("/orders/all", { params });
    return data;
  },
};
