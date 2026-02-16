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
  quantity: number;
  unitPrice: number;
  subTotal: number;
  medicine: {
    id: string;
    genericName: string;
    brandName: string;
    price: number;
  };
}

export interface IOrder {
  id: string;
  orderNumber: string;
  status: string;
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

export interface IOrderResponse {
  success: boolean;
  message: string;
  data: IOrder;
}
