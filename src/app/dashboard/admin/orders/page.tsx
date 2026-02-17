"use client";

import DashboardPageHeader from "@/components/shared/dashboard-header";
import { Badge, getStatusVariant } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTable } from "@/components/ui/data-table/data-table";
import { DataTableColumnHeader } from "@/components/ui/data-table/data-table-column-header";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAllOrders } from "@/features/order/hooks/use-orders";
import { IOrder, OrderStatus } from "@/features/order/order.type";
import useDebounce from "@/hooks/use-debounce";
import { formatCurrency } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Eye, Filter, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const STATUS_OPTIONS = [
  OrderStatus.PLACED,
  OrderStatus.PROCESSING,
  OrderStatus.SHIPPED,
  OrderStatus.DELIVERED,
  OrderStatus.CANCELLED,
];

export default function ManageOrdersPage() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<string | undefined>("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | undefined>(
    "desc",
  );

  const [status, setStatus] = useState<OrderStatus[] | undefined>([
    OrderStatus.PLACED,
    OrderStatus.PROCESSING,
  ]);

  const debouncedSearch = useDebounce(search, 500);

  const { data, isLoading } = useAllOrders({
    page,
    limit,
    searchTerm: debouncedSearch,
    sortBy,
    sortOrder,
    status: status?.join(","),
  });

  const columns: ColumnDef<IOrder>[] = [
    {
      accessorKey: "orderNumber",
      header: "Order #",
      cell: ({ row }) => (
        <span className="font-medium text-slate-800">
          {row.original.orderNumber}
        </span>
      ),
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Date" />
      ),
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="font-medium text-slate-700">
            {format(new Date(row.original.createdAt), "MMM dd, yyyy")}
          </span>
          <span className="text-[12px] text-slate-600 font-medium">
            {format(new Date(row.original.createdAt), "hh:mm a")}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "shippingName",
      header: "Customer",
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="font-medium text-slate-800">
            {row.original.shippingName}
          </span>
          <span className="text-[12px] text-slate-600 font-medium">
            {row.original.shippingPhone}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "totalAmount",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Total Amount" />
      ),
      cell: ({ row }) => (
        <span className="font-semibold">
          {formatCurrency(row.original.totalAmount)}
        </span>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <Badge variant={getStatusVariant(row.original.status).variant}>
          {row.original.status}
        </Badge>
      ),
    },
    {
      id: "actions",
      header: () => <div className="text-left">Action</div>,
      cell: ({ row }) => (
        <div className="text-">
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="hover:bg-primary/5 hover:text-primary"
          >
            <Link href={`/dashboard/admin/orders/${row.original.id}`}>
              <Eye className="h-4 w-4" /> View Details
            </Link>
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <DashboardPageHeader
        title="Manage Orders"
        description="View and manage all customer orders"
        Icon={ShoppingBag}
      />

      <DataTable
        columns={columns}
        data={data?.data || []}
        meta={data?.meta}
        isLoading={isLoading}
        onPageChange={setPage}
        onLimitChange={setLimit}
        onSearch={setSearch}
        onSort={(sortBy, sortOrder) => {
          setSortBy(sortBy);
          setSortOrder(sortOrder);
        }}
        renderTopContent={() => (
          <div className="flex items-center gap-2">
            <Popover>
              <PopoverTrigger asChild className="font-medium">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-9 flex gap-2 text-xs font-medium"
                >
                  <Filter className="h-3 w-3" />
                  Status
                  {status && status.length > 0 && (
                    <Badge
                      variant="secondary"
                      className="ml-1 px-1 font-normal lg:hidden"
                    >
                      {status.length}
                    </Badge>
                  )}
                  <div className="hidden space-x-1 lg:flex">
                    {status && status.length > 2 ? (
                      <Badge variant="secondary" className="px-1 font-normal">
                        {status.length} selected
                      </Badge>
                    ) : (
                      status?.map((s) => (
                        <Badge
                          variant={getStatusVariant(s).variant}
                          key={s}
                          className="px-1 font-medium"
                        >
                          {s}
                        </Badge>
                      ))
                    )}
                  </div>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-2" align="start">
                <div className="space-y-2">
                  <div
                    className="flex items-center space-x-2 p-2 hover:bg-slate-100 rounded-md cursor-pointer"
                    onClick={() => setStatus([])}
                  >
                    <Checkbox checked={status?.length === 0} />
                    <label className="text-xs font-medium leading-none cursor-pointer">
                      Clear Filters
                    </label>
                  </div>
                  <hr />
                  {STATUS_OPTIONS.map((opt) => (
                    <div
                      key={opt}
                      className="flex items-center space-x-2 p-2 hover:bg-slate-100 rounded-md cursor-pointer"
                      onClick={() => {
                        const current = status || [];
                        const next = current.includes(opt)
                          ? current.filter((s) => s !== opt)
                          : [...current, opt];
                        setStatus(next.length > 0 ? next : []);
                      }}
                    >
                      <Checkbox checked={status?.includes(opt)} />
                      <label className="text-xs font-medium leading-none cursor-pointer">
                        {opt}
                      </label>
                    </div>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </div>
        )}
      />
    </div>
  );
}
