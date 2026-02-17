"use client";
import {
  useDeleteMedicine,
  useSellerMedicines,
} from "@/features/medicine/hooks/use-seller-medicines";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MedicineForm } from "@/features/medicine/components/medicine-form";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/ui/data-table/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { IMedicine } from "@/features/medicine/medicine.type";
import DashboardPageHeader from "@/components/shared/dashboard-header";
import { Package } from "lucide-react";
import useDebounce from "@/hooks/use-debounce";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";

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
        const stock = row.original.stockQuantity;
        return stock < 10 ? (
          <Badge variant="destructive">{stock}</Badge>
        ) : (
          <span>{stock}</span>
        );
      },
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => <span>৳{row.original.price}</span>,
    },
    {
      accessorKey: "expiryDate",
      header: "Expiry",
      cell: ({ row }) => (
        <span>{new Date(row.original.expiryDate).toLocaleDateString()}</span>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Created At",
      cell: ({ row }) => (
        <span>{new Date(row.original.createdAt).toLocaleDateString()}</span>
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
      />
    </div>
  );
}
