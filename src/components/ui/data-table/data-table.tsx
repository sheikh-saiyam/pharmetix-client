"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import * as React from "react";
import { Inbox, LucideIcon } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IMeta } from "@/types/index.type";
import { DataTablePagination } from "./data-table-pagination";
import { EmptyState } from "@/components/ui/empty-state";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";

interface DataTableEmptyState {
  icon?: LucideIcon;
  title?: string;
  description?: string;
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  meta?: IMeta;
  onPageChange?: (page: number) => void;
  onLimitChange?: (limit: number) => void;
  onSearch?: (search: string) => void;
  onSort?: (sortBy: string, sortOrder: "asc" | "desc") => void;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  isLoading?: boolean;
  renderTopContent?: () => React.ReactNode;
  /** Custom empty state displayed when data is empty and not loading */
  emptyState?: DataTableEmptyState;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  meta,
  onPageChange,
  onLimitChange,
  onSearch,
  onSort,
  sortBy,
  sortOrder,
  isLoading,
  renderTopContent,
  emptyState,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [sorting, setSorting] = React.useState<SortingState>(
    sortBy ? [{ id: sortBy, desc: sortOrder === "desc" }] : [],
  );

  // Track if it's the first render to avoid redundant onSort call
  const isFirstRender = React.useRef(true);
  const [globalFilter, setGlobalFilter] = React.useState("");

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      globalFilter,
      pagination: {
        pageIndex: meta ? meta.page - 1 : 0,
        pageSize: meta ? meta.limit : 20,
      },
    },
    pageCount: meta?.totalPages ?? -1, // Use -1 or totalPages
    manualPagination: true,
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  // Handle sorting changes
  React.useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (onSort && sorting.length > 0) {
      const { id, desc } = sorting[0];
      onSort(id, desc ? "desc" : "asc");
    } else if (onSort && sorting.length === 0) {
      onSort("", "asc"); // Clear sort
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sorting]);

  return (
    <div className="space-y-4">
      {onSearch && (
        <div className="flex items-center py-4 gap-4">
          <div className="relative w-full md:max-w-full">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search..."
              value={globalFilter ?? ""}
              onChange={(event) => {
                setGlobalFilter(event.target.value);
                onSearch(event.target.value);
              }}
              className="flex-1 pl-8 pr-10"
            />
            {globalFilter && (
              <button
                onClick={() => setGlobalFilter("")}
                className="absolute right-1.5 top-1.5 text-slate-500 hover:text-foreground transition-colors p-1 hover:bg-secondary rounded-md"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          {renderTopContent && renderTopContent()}
        </div>
      )}
      <div className="rounded-md border bg-white shadow-xs overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              // Skeleton loader matching row count
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  {columns.map((_, j) => (
                    <TableCell key={j}>
                      <div className="h-6 bg-slate-100 rounded animate-pulse" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="hover:bg-slate-50/50"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow className="hover:bg-transparent">
                <TableCell colSpan={columns.length} className="p-0">
                  <EmptyState
                    icon={emptyState?.icon ?? Inbox}
                    title={emptyState?.title ?? "No results found"}
                    description={
                      emptyState?.description ??
                      "There are no records to display at the moment."
                    }
                  />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination
        table={table}
        meta={meta}
        onPageChange={onPageChange}
        onLimitChange={onLimitChange}
      />
    </div>
  );
}
