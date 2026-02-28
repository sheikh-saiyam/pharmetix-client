"use client";

import DashboardPageHeader from "@/components/shared/dashboard-header";
import { Badge, getStatusVariant } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table/data-table";
import { DataTableColumnHeader } from "@/components/ui/data-table/data-table-column-header";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useSellerOrders,
  useUpdateOrderItemStatus,
} from "@/features/order/hooks/use-seller-orders";
import { IOrderItem, OrderItemStatus } from "@/features/order/order.type";
import useDebounce from "@/hooks/use-debounce";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import {
  ClipboardList,
  Eye,
  Filter,
  MapPin,
  Package,
  User,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const STATUS_OPTIONS = Object.values(OrderItemStatus);

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
        <Badge variant={getStatusVariant(row.original.status).variant}>
          {row.original.status}
        </Badge>
      ),
    },
    {
      id: "view_details",
      header: () => <div className="text-left">View Details</div>,
      cell: ({ row }) => (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleViewDetails(row.original)}
        >
          <Eye className="h-4 w-7 mt-px" /> Details
        </Button>
      ),
    },
    {
      id: "actions",
      header: () => <div className="text-right">Update Status</div>,
      cell: ({ row }) => (
        <div className="text-right flex items-center justify-end gap-2">
          <Select
            defaultValue={row.original.status}
            onValueChange={(val) =>
              updateStatus.mutate(
                {
                  itemId: row.original.id,
                  status: val as OrderItemStatus,
                },
                {
                  onSuccess: () => {
                    toast.success(`Status updated to ${val}`, {
                      description: `Order Item: ${row.original.id}`,
                    });
                  },
                },
              )
            }
            disabled={updateStatus.isPending}
          >
            <SelectTrigger className="w-[150px] h-8 text-xs font-medium">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              {STATUS_OPTIONS.map((opt) => (
                <SelectItem
                  key={`order-item-status-00-${opt}`}
                  value={opt}
                  className="text-xs font-medium"
                >
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
        sortBy={sortBy}
        sortOrder={sortOrder}
        renderTopContent={() => (
          <div className="flex items-center gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-9 flex gap-2 text-xs font-medium"
                >
                  <Filter className="h-3 w-3" />
                  Status
                  {status && status !== "ALL" && (
                    <Badge
                      variant={getStatusVariant(status).variant}
                      className="px-1.5 font-medium"
                    >
                      {status}
                    </Badge>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-2" align="start">
                <div className="space-y-1">
                  <div
                    className="flex items-center space-x-2 p-2 hover:bg-slate-100 rounded-md cursor-pointer"
                    onClick={() => setStatus("ALL")}
                  >
                    <Checkbox checked={!status || status === "ALL"} />
                    <label className="text-xs font-medium leading-none cursor-pointer">
                      All Status
                    </label>
                  </div>
                  <hr />
                  {STATUS_OPTIONS.map((opt) => (
                    <div
                      key={opt}
                      className="flex items-center space-x-2 p-2 hover:bg-slate-100 rounded-md cursor-pointer"
                      onClick={() =>
                        setStatus((prev) => (prev === opt ? "ALL" : opt))
                      }
                    >
                      <Checkbox checked={status === opt} />
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
        emptyState={{
          icon: ClipboardList,
          title: "No orders found",
          description:
            "You haven't received any orders yet. Orders will appear here once customers place them.",
        }}
      />

      {/* Details Dialog */}
      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="sm:max-w-3xl [&>button]:hidden">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Package className="h-5 w-5 text-primary" />
              Order Item Details
            </DialogTitle>
          </DialogHeader>

          {selectedItem && (
            <div className="flex flex-col md:flex-row md:items-center gap-6 pt-4">
              <div className="space-y-3 w-full md:w-1/2">
                <h3 className="font-semibold tracking-wide text-slate-800 border-b pb-1">
                  Medicine Information
                </h3>
                <Card className="bg-slate-50 shadow-md border shadow-muted">
                  <CardContent className="space-y-4">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground font-semibold">
                        Brand Name:
                      </span>
                      <span className="font-bold">
                        {selectedItem.medicine.brandName}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground font-semibold">
                        Generic Name:
                      </span>
                      <span className="italic font-medium">
                        {selectedItem.medicine.genericName}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs pt-2 border-t">
                      <span className="text-muted-foreground font-semibold">
                        Quantity:
                      </span>
                      <span className="font-bold">
                        {selectedItem.quantity} units
                      </span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground font-semibold">
                        Unit Price:
                      </span>
                      <span className="font-bold">
                        <span className="font-extrabold">৳</span>
                        {selectedItem.unitPrice}
                      </span>
                    </div>
                    <div className="flex justify-between pt-2 text-xs border-t">
                      <span className="font-semibold text-muted-foreground">
                        Subtotal:
                      </span>
                      <span className="font-black text-xs">
                        <span className="font-extrabold">৳</span>
                        {selectedItem.subTotal}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-4 w-full md:w-1/2">
                <h3 className="font-semibold tracking-wide text-slate-800 border-b pb-1">
                  Order & Shipping
                </h3>
                <Card className="bg-slate-50 shadow-md border shadow-muted">
                  <CardContent className="space-y-3">
                    <div className="flex items-start gap-3 text-sm">
                      <User className="h-4 w-4 text-slate-800 mt-0.5" />
                      <div>
                        <p className="font-medium">
                          {selectedItem.order.shippingName}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 text-sm">
                      <MapPin className="h-4 w-4 text-slate-800 mt-0.5" />
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
                        <span className="text-muted-foreground font-semibold">
                          Order Number:
                        </span>
                        <span className="font-mono">
                          {selectedItem.order.orderNumber}
                        </span>
                      </div>
                      <div className="flex justify-between text-xs mt-1">
                        <span className="text-muted-foreground font-semibold">
                          Order Date:
                        </span>
                        <span>
                          {format(
                            new Date(selectedItem.order.createdAt),
                            "PPP",
                          )}
                        </span>
                      </div>
                      <div className="flex justify-between items-center mt-3">
                        <span className="text-xs text-muted-foreground tracking-tighter font-semibold">
                          Current Order Status:
                        </span>
                        <Badge
                          variant={
                            getStatusVariant(selectedItem.order.status).variant
                          }
                          className="h-5 text-[10px] px-2"
                        >
                          {selectedItem.order.status}
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
