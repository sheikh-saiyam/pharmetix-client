import { IMeta } from "@/types/index.type";

export interface TOrderItemPayload {
  medicineId: string;
  quantity: number;
}

export interface TCreateOrderPayload {
  shippingName: string;
  shippingPhone: string;
  shippingAddress: string;
  shippingCity: string;
  shippingPostalCode: string;
  orderItems: TOrderItemPayload[];
}

export enum OrderStatus {
  PLACED = "PLACED",
  CANCELLED = "CANCELLED",
  PROCESSING = "PROCESSING",
  SHIPPED = "SHIPPED",
  DELIVERED = "DELIVERED",
}

export enum OrderItemStatus {
  PROCESSING = "PROCESSING",
  SHIPPED = "SHIPPED",
}

export interface IOrderItem {
  id: string;
  status: OrderItemStatus;
  quantity: number;
  unitPrice: number;
  subTotal: number;
  orderId: string;
  medicineId: string;
  sellerId: string;
  medicine: {
    id: string;
    slug: string;
    genericName: string;
    brandName: string;
    price: number;
    image?: string;
  };
  order: {
    id: string;
    status: OrderStatus;
    orderNumber: string;
    shippingName: string;
    shippingPhone: string;
    shippingAddress: string;
    shippingCity: string;
    shippingPostalCode: string;
    createdAt: string;
  };
}

export interface IOrder {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  totalAmount: number;
  shippingName: string;
  shippingPhone: string;
  shippingAddress: string;
  shippingCity: string;
  shippingPostalCode: string;
  paymentMethod: string;
  createdAt: string;
  updatedAt: string;
  orderItems: IOrderItem[];
}

export interface IMyOrdersResponse {
  success: boolean;
  message: string;
  meta: IMeta;
  data: IOrder[];
}

export interface ISellerOrderItemsResponse {
  success: boolean;
  message: string;
  meta: IMeta;
  data: IOrderItem[];
}

export interface IOrderResponse {
  success: boolean;
  message: string;
  data: IOrder;
}

export interface IGetOrdersParams {
  page?: number;
  limit?: number;
  search?: string;
  searchTerm?: string;
  status?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}
