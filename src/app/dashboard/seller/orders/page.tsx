"use client";

import {
  useSellerOrders,
  useUpdateOrderItemStatus,
} from "@/features/order/hooks/use-seller-orders";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { useState } from "react";
import { DataTable } from "@/components/ui/data-table/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { IOrderItem, OrderItemStatus } from "@/features/order/order.type";
import useDebounce from "@/hooks/use-debounce";
import DashboardPageHeader from "@/components/shared/dashboard-header";
import { ClipboardList, Eye, Package, User, MapPin, Phone } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DataTableColumnHeader } from "@/components/ui/data-table/data-table-column-header";

export default function SellerOrdersPage() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<string | undefined>(
    OrderItemStatus.PROCESSING,
  );
  const [sortBy, setSortBy] = useState<string | undefined>("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | undefined>(
    "desc",
  );

  const debouncedSearch = useDebounce(search, 500);

  const { data, isLoading } = useSellerOrders({
    page,
    limit,
    searchTerm: debouncedSearch,
    status: status === "ALL" ? undefined : (status as OrderItemStatus),
    sortBy,
    sortOrder,
  });

  const updateStatus = useUpdateOrderItemStatus();
  const [selectedItem, setSelectedItem] = useState<IOrderItem | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const handleViewDetails = (item: IOrderItem) => {
    setSelectedItem(item);
    setDetailsOpen(true);
  };

  const statusOptions = Object.values(OrderItemStatus);

  const columns: ColumnDef<IOrderItem>[] = [
    {
      accessorKey: "order.orderNumber",
      header: "Order #",
      cell: ({ row }) => (
        <span className="font-mono font-medium">
          {row.original.order.orderNumber}
        </span>
      ),
    },
    {
      accessorKey: "medicine.brandName",
      header: "Medicine",
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="font-medium">{row.original.medicine.brandName}</span>
          <span className="text-xs text-muted-foreground italic">
            {row.original.medicine.genericName}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "quantity",
      header: "Qty",
    },
    {
      accessorKey: "subTotal",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Total" />
      ),
      cell: ({ row }) => <span>৳{row.original.subTotal}</span>,
    },
    {
      accessorKey: "order.createdAt",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Date" />
      ),
      cell: ({ row }) => (
        <span>
          {format(new Date(row.original.order.createdAt), "MMM d, yyyy")}
        </span>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <Badge
          variant={
            row.original.status === OrderItemStatus.SHIPPED
              ? "default"
              : row.original.status === OrderItemStatus.PROCESSING
                ? "secondary"
                : "secondary"
          }
        >
          {row.original.status}
        </Badge>
      ),
    },
    {
      id: "actions",
      header: () => <div className="text-right">Actions</div>,
      cell: ({ row }) => (
        <div className="text-right flex items-center justify-end gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleViewDetails(row.original)}
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Select
            defaultValue={row.original.status}
            onValueChange={(val) =>
              updateStatus.mutate({
                itemId: row.original.id,
                status: val as OrderItemStatus,
              })
            }
            disabled={updateStatus.isPending}
          >
            <SelectTrigger className="w-[130px] h-8 text-xs">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map((opt) => (
                <SelectItem key={opt} value={opt} className="text-xs">
                  {opt}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <DashboardPageHeader
          title="Manage Orders"
          description="Track and process your medicine orders"
          Icon={ClipboardList}
        />
      </div>

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
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Status</SelectItem>
                {statusOptions.map((opt) => (
                  <SelectItem key={opt} value={opt}>
                    {opt}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      />

      {/* Details Dialog */}
      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Package className="h-5 w-5 text-primary" />
              Order Item Details
            </DialogTitle>
          </DialogHeader>

          {selectedItem && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <div className="space-y-4">
                <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground border-b pb-1">
                  Medicine Information
                </h3>
                <Card className="border-none bg-slate-50">
                  <CardContent className="pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Brand Name:</span>
                      <span className="font-bold">
                        {selectedItem.medicine.brandName}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        Generic Name:
                      </span>
                      <span className="italic">
                        {selectedItem.medicine.genericName}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm pt-2 border-t">
                      <span className="text-muted-foreground">Quantity:</span>
                      <span className="font-bold">
                        {selectedItem.quantity} units
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Unit Price:</span>
                      <span className="font-bold text-primary">
                        ৳{selectedItem.unitPrice}
                      </span>
                    </div>
                    <div className="flex justify-between text-base pt-2 border-t text-primary">
                      <span className="font-bold">Subtotal:</span>
                      <span className="font-black">
                        ৳{selectedItem.subTotal}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground border-b pb-1">
                  Order & Shipping
                </h3>
                <Card className="border-none bg-slate-50">
                  <CardContent className="pt-4 space-y-3">
                    <div className="flex items-start gap-3 text-sm">
                      <User className="h-4 w-4 text-slate-400 mt-0.5" />
                      <div>
                        <p className="font-medium">
                          {selectedItem.order.shippingName}
                        </p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                          <Phone className="h-3 w-3" />{" "}
                          {selectedItem.order.shippingPhone}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 text-sm">
                      <MapPin className="h-4 w-4 text-slate-400 mt-0.5" />
                      <div>
                        <p className="leading-tight">
                          {selectedItem.order.shippingAddress}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {selectedItem.order.shippingCity},{" "}
                          {selectedItem.order.shippingPostalCode}
                        </p>
                      </div>
                    </div>
                    <div className="pt-3 border-t">
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">
                          Order Number:
                        </span>
                        <span className="font-mono">
                          {selectedItem.order.orderNumber}
                        </span>
                      </div>
                      <div className="flex justify-between text-xs mt-1">
                        <span className="text-muted-foreground">
                          Order Date:
                        </span>
                        <span>
                          {format(
                            new Date(selectedItem.order.createdAt),
                            "PPP",
                          )}
                        </span>
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-muted-foreground uppercase tracking-tighter font-bold">
                          Current Status:
                        </span>
                        <Badge
                          variant="outline"
                          className="h-5 text-[10px] px-2"
                        >
                          {selectedItem.status}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
