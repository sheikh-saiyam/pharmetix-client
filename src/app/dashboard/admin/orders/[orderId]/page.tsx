"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import {
  AlertCircle,
  ArrowLeft,
  Calendar,
  CreditCard,
  Hash,
  Package2,
  Phone,
  ShoppingBag,
  Truck,
  User,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table/data-table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { OrderStatusTracker } from "@/features/order/components/order-status-tracker";
import {
  useOrder,
  useUpdateOrderStatus,
} from "@/features/order/hooks/use-orders";
import {
  IOrderItem,
  OrderItemStatus,
  OrderStatus,
} from "@/features/order/order.type";
import { formatCurrency } from "@/lib/utils";

export default function AdminOrderDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = params.orderId as string;
  const { data, isLoading } = useOrder(orderId);
  const updateStatusMutation = useUpdateOrderStatus();

  if (isLoading) {
    return (
      <div className="space-y-8 animate-pulse">
        <div className="h-10 w-48 bg-slate-100 rounded-full" />
        <div className="h-40 bg-slate-50 rounded-[1.5rem]" />
        <div className="grid md:grid-cols-2 gap-6">
          <div className="h-48 bg-slate-50 rounded-[2rem]" />
          <div className="h-48 bg-slate-50 rounded-[2rem]" />
        </div>
        <div className="h-80 bg-slate-50 rounded-[1.5rem]" />
      </div>
    );
  }

  if (!data || !data.data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <div className="p-4 bg-slate-50 rounded-full">
          <AlertCircle className="h-12 w-12 text-slate-300" />
        </div>
        <h2 className="text-xl font-black text-slate-800">Order Not Found</h2>
        <Button onClick={() => router.back()} variant="ghost">
          Go Back
        </Button>
      </div>
    );
  }

  const order = data.data;

  // Check if all order items are shipped
  const allItemsShipped = order.orderItems.every(
    (item) => item.status === OrderItemStatus.SHIPPED,
  );

  const handleStatusUpdate = (newStatus: OrderStatus) => {
    updateStatusMutation.mutate({ orderId: order.id, status: newStatus });
  };

  const columns: ColumnDef<IOrderItem>[] = [
    {
      accessorKey: "medicine",
      header: "Product",
      cell: ({ row }) => {
        const item = row.original;
        return (
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-slate-100 flex items-center justify-center">
              <Package2 className="h-5 w-5 text-slate-400" />
            </div>
            <div>
              <p className="font-black text-slate-800 text-sm leading-none">
                {item.medicine.brandName}
              </p>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight mt-1">
                {item.medicine.genericName}
              </p>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "quantity",
      header: "Qty",
      cell: ({ row }) => (
        <span className="font-bold text-slate-600">
          x {row.original.quantity}
        </span>
      ),
    },
    {
      accessorKey: "unitPrice",
      header: "Price",
      cell: ({ row }) => (
        <span className="font-bold text-slate-600">
          {formatCurrency(row.original.unitPrice)}
        </span>
      ),
    },
    {
      accessorKey: "status",
      header: "Item Status",
      cell: ({ row }) => (
        <Badge
          variant={
            row.original.status === OrderItemStatus.SHIPPED
              ? "success"
              : "secondary"
          }
        >
          {row.original.status}
        </Badge>
      ),
    },
    {
      accessorKey: "subTotal",
      header: "Subtotal",
      cell: ({ row }) => (
        <span className="font-black text-primary">
          {formatCurrency(row.original.subTotal)}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <Button
          onClick={() => router.back()}
          variant="ghost"
          className="w-fit text-slate-500 hover:bg-slate-50 font-bold gap-2 rounded-lg -ml-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Orders
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold text-slate-800">
              Order #{order.orderNumber}
            </h1>
          </div>
          <p className="text-slate-500 font-medium flex items-center gap-2">
            Tracking ID:{" "}
            <span className="font-black text-slate-600 bg-slate-100 px-2 py-0.5 rounded-lg text-xs">
              {order.id}
            </span>
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-slate-50 p-4 rounded-[1.5rem] border border-slate-100">
          <div className="space-y-1">
            <p className="text-[10px] font-black text-slate-600 uppercase tracking-wider">
              Update Order Status
            </p>
            {!allItemsShipped &&
              order.status !== OrderStatus.CANCELLED &&
              order.status !== OrderStatus.DELIVERED && (
                <p className="text-[10px] text-amber-600 font-bold flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  All order items must be SHIPPED before marking order as
                  SHIPPED or DELIVERED
                </p>
              )}
          </div>
          <Select
            value={order.status}
            onValueChange={(value) => handleStatusUpdate(value as OrderStatus)}
            disabled={updateStatusMutation.isPending}
          >
            <SelectTrigger className="w-[180px] bg-white border-slate-200 rounded-xl font-bold text-slate-700">
              <SelectValue placeholder="Change Status" />
            </SelectTrigger>
            <SelectContent className="rounded-xl border-slate-100 shadow-xl font-medium">
              <SelectItem value={OrderStatus.PLACED}>Placed</SelectItem>
              <SelectItem value={OrderStatus.PROCESSING}>Processing</SelectItem>
              <SelectItem
                value={OrderStatus.SHIPPED}
                disabled={!allItemsShipped}
              >
                Shipped
              </SelectItem>
              <SelectItem
                value={OrderStatus.DELIVERED}
                disabled={!allItemsShipped}
              >
                Delivered
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Status Tracker */}
      <div className="bg-white border border-slate-100 p-8 rounded-[1.5rem] shadow-lg shadow-slate-100/50">
        <OrderStatusTracker status={order.status} />
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Info Sidebar */}
        <div className="space-y-8">
          <Card className="rounded-[1.5rem] border-slate-100 shadow-lg shadow-slate-100/50">
            <div className="px-8 py-3 space-y-8">
              <div className="space-y-6">
                <h3 className="font-black text-slate-800 text-base flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  Order Info
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-slate-50 rounded-xl">
                      <Hash className="h-4 w-4 text-slate-400" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-600">
                        Order Number
                      </p>
                      <p className="font-bold text-slate-700">
                        {order.orderNumber}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-slate-50 rounded-xl">
                      <Calendar className="h-4 w-4 text-slate-400" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-600">
                        Date & Time
                      </p>
                      <p className="font-bold text-slate-700">
                        {format(new Date(order.createdAt), "PPP p")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-slate-50 rounded-xl">
                      <CreditCard className="h-4 w-4 text-slate-400" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-600">
                        Payment Method
                      </p>
                      <p className="font-bold text-slate-700">
                        Cash On Delivery
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <Separator className="bg-slate-100" />

              <div className="space-y-6">
                <h3 className="font-black text-slate-800 text-base flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  Customer Details
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-slate-50 rounded-xl">
                      <User className="h-4 w-4 text-slate-400" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-600">
                        Recipient Name
                      </p>
                      <p className="font-bold text-slate-700">
                        {order.shippingName}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-slate-50 rounded-xl">
                      <Phone className="h-4 w-4 text-slate-400" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-600">
                        Phone Number
                      </p>
                      <p className="font-bold text-slate-700">
                        {order.shippingPhone}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-slate-50 rounded-xl">
                      <Truck className="h-4 w-4 text-slate-400" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-600">
                        Shipping Address
                      </p>
                      <p className="font-bold text-slate-700 leading-tight">
                        {order.shippingAddress}, {order.shippingCity} -{" "}
                        {order.shippingPostalCode}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Order Items */}
        <div className="lg:col-span-2 space-y-8">
          <Card className="rounded-[1.5rem] pt-0 border-slate-100 overflow-hidden shadow-lg shadow-slate-100/50">
            <div className="bg-slate-50/50 px-8 py-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-black text-slate-800 text-sm flex items-center gap-2">
                <ShoppingBag className="h-4 w-4 text-primary" />
                Order Items
              </h3>
              <span className="text-[10px] font-bold text-slate-400 bg-white px-3 py-1 rounded-full border border-slate-100 uppercase">
                {order.orderItems.length} Products
              </span>
            </div>
            <CardContent className="p-0 px-4">
              <DataTable
                columns={columns}
                data={order.orderItems}
                isLoading={false}
              />

              <div className="p-8 bg-slate-50/30 border-t border-slate-100">
                <div className="flex flex-col items-end space-y-3">
                  <div className="flex items-center justify-between w-full max-w-[300px]">
                    <span className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                      Subtotal
                    </span>
                    <span className="font-bold text-slate-700">
                      {formatCurrency(order.totalAmount)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between w-full max-w-[300px]">
                    <span className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                      Shipping
                    </span>
                    <span className="font-bold text-emerald-500 bg-emerald-50 px-3 py-0.5 rounded-full text-[10px] uppercase">
                      Free Shipping
                    </span>
                  </div>
                  <Separator className="w-full max-w-[300px] bg-slate-200" />
                  <div className="flex items-center justify-between w-full max-w-[300px]">
                    <span className="text-slate-800 font-black uppercase tracking-wider text-xs">
                      Grand Total
                    </span>
                    <span className="text-xl font-black text-primary">
                      {formatCurrency(order.totalAmount)}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
