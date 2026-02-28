"use client";
import DashboardPageHeader from "@/components/shared/dashboard-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table/data-table";
import { DataTableColumnHeader } from "@/components/ui/data-table/data-table-column-header";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMedicines } from "@/features/medicine/hooks/use-medicines";
import { IMedicine } from "@/features/medicine/medicine.type";
import useDebounce from "@/hooks/use-debounce";
import { ColumnDef } from "@tanstack/react-table";
import { Copy, ExternalLink, Eye, MoreHorizontal, Package } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

export default function SellerMedicinesPage() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<string | undefined>("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | undefined>(
    "desc",
  );

  const debouncedSearch = useDebounce(search, 500);

  const { data, isLoading } = useMedicines({
    page,
    limit,
    searchTerm: debouncedSearch,
    sortBy,
    sortOrder,
  });

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
      header: () => <div className="text-right pr-4">Actions</div>,
      cell: ({ row }) => {
        const medicine = row.original;

        const copyId = () => {
          navigator.clipboard.writeText(medicine.id);
          toast.success("Medicine ID copied to clipboard");
        };

        return (
          <div className="text-right">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-muted">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52">
                <DropdownMenuLabel>Medicine Actions</DropdownMenuLabel>

                <DropdownMenuItem onClick={copyId} className="cursor-pointer">
                  <Copy className="mr-2 h-4 w-4 text-muted-foreground" />
                  Copy Medicine ID
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                {/* Navigation Actions */}
                <Link href={`/medicines/${medicine.slug}`}>
                  <DropdownMenuItem className="cursor-pointer">
                    <Eye className="mr-2 h-4 w-4 text-muted-foreground" />
                    View Details
                  </DropdownMenuItem>
                </Link>

                <Link href={`/medicine/${medicine.slug}`} target="_blank">
                  <DropdownMenuItem className="cursor-pointer">
                    <ExternalLink className="mr-2 h-4 w-4 text-muted-foreground" />
                    View on Store
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <DashboardPageHeader
          title="All Medicines"
          description="View all medicines in the pharmacy"
          Icon={Package}
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
