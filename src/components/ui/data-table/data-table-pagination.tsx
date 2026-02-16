import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IMeta } from "@/types/index.type";
import { Table } from "@tanstack/react-table";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  meta?: IMeta;
  onPageChange?: (page: number) => void;
  onLimitChange?: (limit: number) => void;
}

export function DataTablePagination<TData>({
  table,
  meta,
  onPageChange,
  onLimitChange,
}: DataTablePaginationProps<TData>) {
  const pageIndex = meta
    ? meta.page - 1
    : table.getState().pagination?.pageIndex || 0;
  const pageSize = meta
    ? meta.limit
    : table.getState().pagination?.pageSize || 10;
  const pageCount = meta ? meta.totalPages : table.getPageCount();
  const total = meta ? meta.total : table.getFilteredRowModel().rows.length;

  if (!meta || total === 0) return null;

  return (
    <div className="flex items-center justify-between px-2">
      <div className="flex-1 text-sm text-muted-foreground">
        {table.getFilteredSelectedRowModel().rows.length > 0 && (
          <>
            {table.getFilteredSelectedRowModel().rows.length} of {total} row(s)
            selected.
          </>
        )}
      </div>
      <div className="flex items-center justify-between space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page</p>
          <Select
            value={`${pageSize}`}
            onValueChange={(value) => {
              if (onLimitChange) {
                onLimitChange(Number(value));
              } else {
                table.setPageSize(Number(value));
              }
            }}
          >
            <SelectTrigger className="h-8 w-[100px]">
              <SelectValue placeholder={pageSize} />
            </SelectTrigger>
            <SelectContent
              align="center"
              side="bottom"
              className="mt-[72px] w-[40px]"
            >
              {[5, 10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Page {pageIndex + 1} of {pageCount}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => {
              if (onPageChange) onPageChange(1);
              else table.setPageIndex(0);
            }}
            disabled={!table.getCanPreviousPage() && (!meta || meta.page <= 1)}
          >
            <span className="sr-only">Go to first page</span>
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => {
              if (onPageChange) onPageChange(meta ? meta.page - 1 : pageIndex);
              else table.previousPage();
            }}
            disabled={!table.getCanPreviousPage() && (!meta || meta.page <= 1)}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => {
              if (onPageChange)
                onPageChange(meta ? meta.page + 1 : pageIndex + 2);
              else table.nextPage();
            }}
            disabled={
              !table.getCanNextPage() && (!meta || meta.page >= meta.totalPages)
            }
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => {
              if (onPageChange)
                onPageChange(meta ? meta.totalPages : pageCount);
              else table.setPageIndex(table.getPageCount() - 1);
            }}
            disabled={
              !table.getCanNextPage() && (!meta || meta.page >= meta.totalPages)
            }
          >
            <span className="sr-only">Go to last page</span>
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
