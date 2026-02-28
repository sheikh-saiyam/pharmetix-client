"use client";

import CustomerPageHeader from "@/components/layout/customer/customer-header";
import { Badge, getStatusVariant } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table/data-table";
import { DataTableColumnHeader } from "@/components/ui/data-table/data-table-column-header";
import { useMyOrders } from "@/features/order/hooks/use-orders";
import { IOrder } from "@/features/order/order.type";
import { formatCurrency } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Eye, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function MyOrdersPage() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [sortBy, setSortBy] = useState<string | undefined>(undefined);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | undefined>(
    undefined,
  );

  const { data, isLoading } = useMyOrders({ page, limit, sortBy, sortOrder });

  const handleSort = (field: string, order: "asc" | "desc") => {
    setSortBy(field);
    setSortOrder(order);
  };

  const columns: ColumnDef<IOrder>[] = [
    {
      accessorKey: "orderNumber",
      header: "Order #",
      cell: ({ row }) => (
        <span className="font-medium">{row.getValue("orderNumber")}</span>
      ),
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Order Date" />
      ),
      cell: ({ row }) => {
        return format(
          new Date(row.getValue("createdAt")),
          "MMM d, yyyy, h:mm a",
        );
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        return (
          <Badge variant={getStatusVariant(status).variant}>{status}</Badge>
        );
      },
    },
    {
      accessorKey: "totalAmount",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Total" />
      ),
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("totalAmount"));

        return <div className="font-medium">{formatCurrency(amount)}</div>;
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const order = row.original;
        return (
          <div className="text-right">
            <Button asChild size="sm" variant="outline" className="shadow-xs">
              <Link
                href={`/customer/orders/${order.id}`}
                className="flex items-center gap-1"
              >
                <Eye /> View Details
              </Link>
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="space-y-6">
      <CustomerPageHeader
        title="My Orders"
        description="Manage your orders and track your shipments."
        Icon={ShoppingBag}
      />
      <DataTable
        columns={columns}
        data={data?.data || []}
        meta={data?.meta}
        onPageChange={setPage}
        onLimitChange={setLimit}
        onSort={handleSort}
        isLoading={isLoading}
        emptyState={{
          icon: ShoppingBag,
          title: "No orders yet",
          description:
            "You haven't placed any orders. Start shopping to see your orders here.",
        }}
      />
    </div>
  );
}
