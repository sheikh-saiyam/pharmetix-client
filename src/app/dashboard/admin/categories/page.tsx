"use client";

import { useCategories } from "@/features/category/hooks/use-categories";
import { useDeleteCategory } from "@/features/category/hooks/use-admin-categories";
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
import { CategoryForm } from "@/features/category/components/category-form";
import { useState } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import DashboardPageHeader from "@/components/shared/dashboard-header";
import { DataTable } from "@/components/ui/data-table/data-table";
import { ColumnDef } from "@tanstack/react-table";
import useDebounce from "@/hooks/use-debounce";
import { ICategory } from "@/features/medicine/medicine.type";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { DataTableColumnHeader } from "@/components/ui/data-table/data-table-column-header";

export default function CategoriesPage() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<string | undefined>("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | undefined>(
    "desc",
  );

  const debouncedSearch = useDebounce(search, 500);

  const { data, isLoading } = useCategories({
    page,
    limit,
    search: debouncedSearch,
    sortBy,
    sortOrder,
  });

  const deleteMutation = useDeleteCategory();
  const [open, setOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<ICategory | null>(
    null,
  );

  const handleEdit = (category: ICategory) => {
    setEditingCategory(category);
    setOpen(true);
  };

  const handleAddNew = () => {
    setEditingCategory(null);
    setOpen(true);
  };

  const columns: ColumnDef<ICategory>[] = [
    {
      accessorKey: "image",
      header: "Image",
      cell: ({ row }) => (
        <div className="relative h-14 w-28 overflow-hidden rounded-md bg-muted">
          {row.original.image && (
            <Image
              src={row.original.image}
              alt={row.original.name}
              fill
              className="object-cover"
            />
          )}
        </div>
      ),
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => (
        <span className="font-medium">{row.original.name}</span>
      ),
    },
    {
      accessorKey: "slug",
      header: "Slug",
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
      accessorKey: "_count.medicines",
      header: "Medicines",
      cell: ({ row }) => (
        <Badge variant="secondary">
          {row.original._count?.medicines || 0} items
        </Badge>
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
            title="Delete Category"
            description={`Are you sure you want to delete the category "${row.original.name}"? This action cannot be undone.`}
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
          title="Manage Categories"
          description="Create and organize medicine categories"
          Icon={Plus}
        />
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleAddNew}>
              <Plus className="mr-2 h-4 w-4" />
              Add Category
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] [&>button]:hidden">
            <DialogHeader className="gap-0">
              <DialogTitle className="text-lg">
                {editingCategory ? "Edit Category" : "Add New Category"}
              </DialogTitle>
              <DialogDescription>
                {editingCategory
                  ? "Update the category details"
                  : "Add a new category for medicines"}
              </DialogDescription>
            </DialogHeader>
            <CategoryForm
              initialData={
                editingCategory
                  ? {
                      id: editingCategory.id,
                      name: editingCategory.name,
                      image: editingCategory.image,
                      description: editingCategory.description,
                    }
                  : undefined
              }
              onSuccess={() => setOpen(false)}
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
          icon: Plus,
          title: "No categories found",
          description:
            'No categories have been created yet. Click "Add Category" to create one.',
        }}
      />
    </div>
  );
}
