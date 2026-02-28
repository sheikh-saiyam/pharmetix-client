"use client";

import {
  useDeleteMedicine,
  useSellerMedicines,
  useUpdateMedicine,
} from "@/features/medicine/hooks/use-seller-medicines";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2, Minus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { MedicineForm } from "@/features/medicine/components/medicine-form";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/ui/data-table/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { IMedicine, IStockOperation } from "@/features/medicine/medicine.type";
import DashboardPageHeader from "@/components/shared/dashboard-header";
import { Package } from "lucide-react";
import useDebounce from "@/hooks/use-debounce";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { DataTableColumnHeader } from "@/components/ui/data-table/data-table-column-header";

export default function SellerMedicinesPage() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<string | undefined>("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | undefined>(
    "desc",
  );

  const debouncedSearch = useDebounce(search, 500);

  const { data, isLoading } = useSellerMedicines({
    page,
    limit,
    searchTerm: debouncedSearch,
    sortBy,
    sortOrder,
  });

  const [open, setOpen] = useState(false);
  const [selectedMedicine, setSelectedMedicine] = useState<IMedicine | null>(
    null,
  );

  const deleteMutation = useDeleteMedicine();
  const updateMutation = useUpdateMedicine();

  const handleUpdateStock = (
    medicine: IMedicine,
    operation: IStockOperation,
    quantity: number = 1,
  ) => {
    updateMutation.mutate({
      id: medicine.id,
      params: {
        stockOperation: operation,
        stockQuantity: quantity,
      },
    });
  };

  const handleEdit = (medicine: IMedicine) => {
    setSelectedMedicine(medicine);
    setOpen(true);
  };

  const handleAddNew = () => {
    setSelectedMedicine(null);
    setOpen(true);
  };

  const columns: ColumnDef<IMedicine>[] = [
    {
      accessorKey: "brandName",
      header: "Brand Name",
      cell: ({ row }) => (
        <span className="font-medium">{row.original.brandName}</span>
      ),
    },
    {
      accessorKey: "genericName",
      header: "Generic Name",
    },
    {
      accessorKey: "stockQuantity",
      header: "Stock",
      cell: ({ row }) => {
        const medicine = row.original;
        const stock = medicine.stockQuantity;
        return (
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7 rounded-full shadow-xs"
              onClick={() =>
                handleUpdateStock(medicine, IStockOperation.DECREMENT)
              }
              disabled={updateMutation.isPending || stock <= 0}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <div className="min-w-[40px] text-center">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    className="h-auto p-0 hover:bg-transparent"
                  >
                    {stock < 10 ? (
                      <Badge
                        variant="destructive"
                        className="px-1.5 cursor-pointer"
                      >
                        {stock}
                      </Badge>
                    ) : (
                      <span className="font-bold text-slate-700 cursor-pointer">
                        {stock}
                      </span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-40 p-3">
                  <div className="space-y-2">
                    <p className="text-xs font-medium">Update Stock</p>
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        defaultValue={stock}
                        className="h-8"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            const val = parseInt(e.currentTarget.value);
                            if (isNaN(val)) return;
                            const diff = val - stock;
                            if (diff === 0) return;
                            handleUpdateStock(
                              medicine,
                              diff > 0
                                ? IStockOperation.INCREMENT
                                : IStockOperation.DECREMENT,
                              Math.abs(diff),
                            );
                            e.currentTarget.blur();
                          }
                        }}
                      />
                    </div>
                    <p className="text-[10px] text-muted-foreground">
                      Press Enter to update
                    </p>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7 rounded-full shadow-xs"
              onClick={() =>
                handleUpdateStock(medicine, IStockOperation.INCREMENT)
              }
              disabled={updateMutation.isPending}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
        );
      },
    },
    {
      accessorKey: "price",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Price" />
      ),
      cell: ({ row }) => (
        <span>
          <span className="font-extrabold text-slate-700">৳</span>{" "}
          {row.original.price}
        </span>
      ),
    },
    {
      accessorKey: "expiryDate",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Expiry Date" />
      ),
      cell: ({ row }) => (
        <span>{new Date(row.original.expiryDate).toLocaleDateString()}</span>
      ),
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Created At" />
      ),
      cell: ({ row }) => (
        <span>{new Date(row.original.createdAt).toLocaleDateString()}</span>
      ),
    },
    {
      accessorKey: "updatedAt",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Updated At" />
      ),
      cell: ({ row }) => (
        <span>{new Date(row.original.updatedAt).toLocaleDateString()}</span>
      ),
    },
    {
      id: "actions",
      header: () => <div className="text-right">Action</div>,
      cell: ({ row }) => (
        <div className="text-right space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleEdit(row.original)}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <ConfirmDialog
            trigger={
              <Button variant="ghost" size="icon" className="text-destructive">
                <Trash2 className="h-4 w-4" />
              </Button>
            }
            title="Delete Medicine"
            description={`Are you sure you want to delete "${row.original.brandName}"? This action cannot be undone.`}
            onConfirm={() => deleteMutation.mutate(row.original.id)}
            variant="destructive"
            isLoading={deleteMutation.isPending}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <DashboardPageHeader
          title="Manage Medicines"
          description="View and manage your pharmaceutical inventory"
          Icon={Package}
        />
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleAddNew}>
              <Plus className="mr-2 h-4 w-4" />
              Add Medicine
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[50%] rounded-none h-[80%] border-0 overflow-y-auto [&>button]:hidden">
            <DialogHeader className="gap-0 border-b pb-4">
              <DialogTitle className="text-lg">
                {selectedMedicine ? "Edit Medicine" : "Add New Medicine"}
              </DialogTitle>
              <DialogDescription>
                {selectedMedicine
                  ? "Update the medicine details"
                  : "Add a new medicine to your inventory"}
              </DialogDescription>
            </DialogHeader>
            <MedicineForm
              onSuccess={() => setOpen(false)}
              initialData={selectedMedicine as IMedicine}
            />
          </DialogContent>
        </Dialog>
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
        emptyState={{
          icon: Package,
          title: "No medicines found",
          description:
            'You haven\'t added any medicines yet. Click "Add Medicine" to get started.',
        }}
      />
    </div>
  );
}
