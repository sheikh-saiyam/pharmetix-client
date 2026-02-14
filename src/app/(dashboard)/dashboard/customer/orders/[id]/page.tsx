"use client";

import { useOrder } from "@/features/order/hooks/use-orders";
import { Badge } from "@/components/ui/badge";
import { useParams } from "next/navigation";
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WriteReviewDialog } from "@/features/review/components/write-review-dialog";

export default function OrderDetailsPage() {
  const params = useParams();
  const id = params.id as string;
  const { data, isLoading } = useOrder(id);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-[200px]" />
        <Skeleton className="h-[300px] w-full" />
      </div>
    );
  }

  if (!data || !data.data) {
    return <div>Order not found</div>;
  }

  const order = data.data;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Order Details</h1>
        <Badge
          variant={order.status === "DELIVERED" ? "default" : "secondary"}
          className="text-lg"
        >
          {order.status}
        </Badge>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Order Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Order Number:</span>
              <span className="font-medium">{order.orderNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Date:</span>
              <span className="font-medium">
                {format(new Date(order.createdAt), "MMM d, yyyy h:mm a")}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Payment Method:</span>
              <span className="font-medium">{order.paymentMethod}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Shipping Address</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex flex-col">
              <span className="font-medium">{order.shippingName}</span>
              <span className="text-muted-foreground">
                {order.shippingAddress}
              </span>
              <span className="text-muted-foreground">
                {order.shippingCity}, {order.shippingPostalCode}
              </span>
              <span className="text-muted-foreground">
                {order.shippingPhone}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Items</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Medicine</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Unit Price</TableHead>
                <TableHead>Total</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {order.orderItems.map((item: any) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div className="font-medium">{item.medicine.brandName}</div>
                    <div className="text-xs text-muted-foreground">
                      {item.medicine.strength}
                    </div>
                  </TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>৳{item.unitPrice}</TableCell>
                  <TableCell>৳{item.subTotal}</TableCell>
                  <TableCell className="text-right">
                    {order.status === "DELIVERED" && (
                      <WriteReviewDialog
                        medicineId={item.medicine.id} // Assuming medicine object is populated
                        orderId={order.id}
                        medicineName={item.medicine.brandName}
                      />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Separator className="my-4" />
          <div className="flex justify-end gap-8 text-lg font-bold">
            <span>Total Amount:</span>
            <span>৳{order.totalAmount}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
