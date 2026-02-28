"use client";

import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table/data-table";
import { Separator } from "@/components/ui/separator";
import { OrderStatusTracker } from "@/features/order/components/order-status-tracker";
import { useOrder } from "@/features/order/hooks/use-orders";
import { IOrderItem, OrderStatus } from "@/features/order/order.type";
import { orderService } from "@/features/order/services/order.service";
import { WriteReviewDialog } from "@/features/review/components/write-review-dialog";
import { formatCurrency } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import {
  ArrowLeft,
  Calendar,
  CreditCard,
  Eye,
  Hash,
  Package2,
  Phone,
  ShoppingBag,
  Truck,
  User,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function OrderDetailsPage() {
  const params = useParams();
  const id = params.id as string;
  const { data, isLoading, refetch } = useOrder(id);
  const [isCancelling, setIsCancelling] = useState(false);

  if (isLoading) {
    return (
      <div className="space-y-8 animate-pulse">
        <div className="h-10 w-48 bg-slate-100 rounded-full" />
        <div className="h-40 bg-slate-50 rounded-[1.5rem] py-0" />
        <div className="grid md:grid-cols-2 gap-6">
          <div className="h-48 bg-slate-50 rounded-[2rem]" />
          <div className="h-48 bg-slate-50 rounded-[2rem]" />
        </div>
        <div className="h-80 bg-slate-50 rounded-[1.5rem] py-0" />
      </div>
    );
  }

  if (!data || !data.data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <div className="p-4 bg-slate-50 rounded-full">
          <XCircle className="h-12 w-12 text-slate-300" />
        </div>
        <h2 className="text-xl font-black text-slate-800">Order Not Found</h2>
        <Button asChild variant="ghost">
          <Link href="/customer/orders">Return to Orders</Link>
        </Button>
      </div>
    );
  }

  const order = data.data;

  const handleCancelOrder = async () => {
    setIsCancelling(true);
    try {
      await orderService.cancelOrder(order.id);
      toast.success("Order cancelled successfully");
      refetch();
    } catch (error) {
      toast.error("Failed to cancel order");
      console.error(error);
    } finally {
      setIsCancelling(false);
    }
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
          x {row.getValue("quantity")}
        </span>
      ),
    },
    {
      accessorKey: "unitPrice",
      header: "Price",
      cell: ({ row }) => (
        <span className="font-bold text-slate-600">
          {formatCurrency(row.getValue("unitPrice"))}
        </span>
      ),
    },
    {
      accessorKey: "subTotal",
      header: "Subtotal",
      cell: ({ row }) => (
        <span className="font-black text-primary">
          {formatCurrency(row.getValue("subTotal"))}
        </span>
      ),
    },
    ...(order.status === OrderStatus.DELIVERED
      ? [
          {
            id: "actions",
            header: "Review",
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            cell: ({ row }: { row: any }) => {
              const item = row.original;
              return item.isReviewed ? (
                <div className="flex items-center gap-2">
                  <Badge variant="success" className="px-4 py-1.5 h-auto">
                    Reviewed
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="rounded-full"
                    asChild
                  >
                    <Link
                      href={`/medicines/${item.medicine.slug}`}
                      className="flex items-center gap-2"
                    >
                      <Eye className="h-4 w-4" /> View Review
                    </Link>
                  </Button>
                </div>
              ) : (
                <WriteReviewDialog
                  medicineId={item.medicine.id}
                  orderId={order.id}
                  medicineName={item.medicine.brandName}
                />
              );
            },
          },
        ]
      : []),
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-10 px-4 pb-4">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <Button
          asChild
          variant="ghost"
          className="w-fit text-slate-500 hover:bg-slate-50 font-bold gap-2 rounded-lg -ml-4"
        >
          <Link href="/customer/orders">
            <ArrowLeft className="h-4 w-4" />
            Back to Orders
          </Link>
        </Button>
      </div>

      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold text-slate-800">Order Details</h1>
          </div>
          <p className="text-slate-500 font-medium flex items-center gap-2">
            Tracking ID:{" "}
            <span className="font-black text-slate-600 bg-slate-100 px-2 py-0.5 rounded-lg text-xs">
              {order.id}
            </span>
          </p>
        </div>

        {order.status === OrderStatus.PLACED && (
          <ConfirmDialog
            trigger={
              <Button
                variant="outline"
                className="rounded-2xl border-red-100 text-red-500 hover:bg-red-50 hover:text-red-600 font-black text6xs gap-2 shadow-xs"
                disabled={isCancelling}
              >
                <XCircle className="h-4 w-4" />
                Cancel Order
              </Button>
            }
            title="Cancel this order?"
            description={`Are you sure you want to cancel order ${order.orderNumber}? This action cannot be undone.`}
            confirmText="Yes, Cancel Order"
            cancelText="Nevermind"
            variant="destructive"
            onConfirm={handleCancelOrder}
            isLoading={isCancelling}
          />
        )}
      </div>

      {/* Status Tracker */}
      <div className="bg-white border border-slate-100 p-8 rounded-[1.5rem] py-0 shadow-lg shadow-slate-100/50">
        <OrderStatusTracker status={order.status} />
      </div>

      <div className="space-y-8">
        {/* Info */}
        <div className="space-y-8">
          <Card className="rounded-[1.5rem] py-0 border-slate-100 shadow-lg shadow-slate-100/50">
            <div className="p-8 space-y-8">
              <div className="space-y-6">
                <h3 className="font-black text-slate-800 text6xs flex items-center gap-2">
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
                        {"Cash On Delivery"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <Separator className="bg-slate-100" />

              <div className="space-y-6">
                <h3 className="font-black text-slate-800 text6xs flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  Shipping Address
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-slate-50 rounded-xl">
                      <User className="h-4 w-4 text-slate-400" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-600">
                        Recipient
                      </p>
                      <p className="font-bold text-slate-700">
                        {order.shippingName}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-slate-50 rounded-xl">
                      <Truck className="h-4 w-4 text-slate-400" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-600">
                        Address
                      </p>
                      <p className="font-bold text-slate-700 leading-tight">
                        {order.shippingAddress}, {order.shippingCity} -{" "}
                        {order.shippingPostalCode}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-slate-50 rounded-xl">
                      <Phone className="h-4 w-4 text-slate-400" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-600">
                        Contact
                      </p>
                      <p className="font-bold text-slate-700">
                        {order.shippingPhone}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-8">
          <Card className="rounded-[1.5rem] py-0 border-slate-100 overflow-hidden shadow-lg shadow-slate-100/50">
            <div className="bg-slate-50/50 px-8 py-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-black text-slate-800 text6sm flex items-center gap-2">
                <ShoppingBag className="h-4 w-4 text-primary" />
                Order Items
              </h3>
              <span className="text-[10px] font-black text-slate-400 bg-white px-3 py-1 rounded-full border border-slate-100 uppercase">
                {order.orderItems.length} Products
              </span>
            </div>
            <CardContent className="px-4 py-0">
              <DataTable
                columns={columns}
                data={order.orderItems}
                isLoading={false}
                emptyState={{
                  icon: ShoppingBag,
                  title: "No items in this order",
                  description: "This order has no items.",
                }}
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
