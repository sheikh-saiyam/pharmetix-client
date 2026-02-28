"use client";

import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { Input } from "@/components/ui/input";
import { PaginationControl } from "@/components/ui/pagination-control";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { MedicineCard } from "@/features/medicine/components/medicine-card";
import { MedicineCardList } from "@/features/medicine/components/medicine-list-card";
import { MedicineSidebar } from "@/features/medicine/components/medicine-sidebar";
import { MedicineSort } from "@/features/medicine/components/medicine-sort";
import { MedicineViewSwitcher } from "@/features/medicine/components/medicine-view-switcher";
import { useMedicines } from "@/features/medicine/hooks/use-medicines";
import { IGetMedicinesParams } from "@/features/medicine/medicine.type";
import { Filter, Search, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function MedicinesClientPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [view, setView] = useState<"grid" | "list">("grid");

  // Get the current search from URL
  const urlSearch = searchParams.get("search") || "";

  const [searchQuery, setSearchQuery] = useState(urlSearch);

  useEffect(() => {
    if (urlSearch !== searchQuery) {
      setSearchQuery(urlSearch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlSearch]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const currentSearch = searchParams.get("search") || "";

      if (searchQuery !== currentSearch) {
        const params = new URLSearchParams(searchParams.toString());
        if (searchQuery) {
          params.set("search", searchQuery);
        } else {
          params.delete("search");
        }
        params.set("page", "1");
        router.push(`/medicines?${params.toString()}`, { scroll: false });
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery, router, searchParams]);

  // 3. Clear search handler
  const handleClearSearch = () => {
    setSearchQuery("");
    const params = new URLSearchParams(searchParams.toString());
    params.delete("search");
    params.set("page", "1");
    router.push(`/medicines?${params.toString()}`, { scroll: false });
  };

  // Construct API params from URL
  const page = Number(searchParams.get("page")) || 1;

  const apiParams: IGetMedicinesParams = {
    page,
    search: searchParams.get("search") || undefined,
    categoryId: searchParams.get("categoryId") || undefined,
    minPrice: searchParams.get("minPrice")
      ? Number(searchParams.get("minPrice"))
      : undefined,
    maxPrice: searchParams.get("maxPrice")
      ? Number(searchParams.get("maxPrice"))
      : undefined,
    isFeatured: searchParams.get("isFeatured") === "true" || undefined,
    sortBy: searchParams.get("sortBy") || undefined,
    // manufacturer: searchParams.get("manufacturer") || undefined,
  };

  const { data, isLoading, isError } = useMedicines(apiParams);

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== "relevance") {
      params.set("sortBy", value);
    } else {
      params.delete("sortBy");
    }
    router.push(`/medicines?${params.toString()}`);
  };

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`/medicines?${params.toString()}`);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar - Desktop */}
        <aside className="hidden lg:block w-80 shrink-0 space-y-6">
          <MedicineSidebar />
        </aside>

        {/* Main Content */}
        <div className="flex-1 space-y-6">
          {/* Top Bar */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-card p-4 rounded-lg border shadow-lg shadow-muted">
            {/* Mobile Filter Trigger */}
            <div className="lg:hidden w-full md:w-auto flex justify-between items-center">
              <h1 className="text-xl font-bold md:hidden">Medicines</h1>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Filter className="h-4 w-4" /> Filters
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="left"
                  className="w-[300px] sm:w-[400px] overflow-y-auto"
                >
                  <SheetHeader className="gap-0">
                    <SheetTitle>Filters</SheetTitle>
                    <SheetDescription>
                      Narrow down your medicine search.
                    </SheetDescription>
                  </SheetHeader>
                  <div className="mt-6">
                    <MedicineSidebar />
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            {/* Search */}
            <div className="relative w-full md:max-w-full">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search for medicines..."
                className="pl-8 pr-10 shadow-xs bg-sidebar-ring/5 border border-sidebar-ring/20 placeholder:text-slate-600"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  onClick={handleClearSearch}
                  className="absolute right-1.5 top-1.5 text-slate-500 hover:text-foreground transition-colors p-1 hover:bg-secondary rounded-md"
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* View & Sort */}
            <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
              <MedicineSort
                value={searchParams.get("sortBy") || "relevance"}
                onValueChange={handleSortChange}
              />
              <MedicineViewSwitcher currentView={view} onViewChange={setView} />
            </div>
          </div>

          {/* Product Grid/List */}
          {isLoading ? (
            <div
              className={
                view === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6"
                  : "flex flex-col gap-4"
              }
            >
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="space-y-4 border rounded-xl p-4">
                  <Skeleton className="h-[180px] w-full rounded-lg" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : isError ? (
            <div className="text-center py-20 text-red-500 bg-red-50 rounded-xl border border-red-100">
              <p>Failed to load medicines. Please try again later.</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => window.location.reload()}
              >
                Retry
              </Button>
            </div>
          ) : data?.data?.length === 0 ? (
            <div className="text-center py-20 bg-muted/20 rounded-xl border border-dashed">
              <EmptyState
                title="No medicines found"
                description="No medicines found matching your criteria."
                icon={Search}
              />
              <Button
                variant="link"
                onClick={() => {
                  const params = new URLSearchParams();
                  router.push(`/medicines?${params.toString()}`);
                  setSearchQuery("");
                }}
              >
                Clear all filters
              </Button>
            </div>
          ) : (
            <div
              className={
                view === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6"
                  : "flex flex-col gap-4"
              }
            >
              {data?.data?.map((medicine) =>
                view === "grid" ? (
                  <MedicineCard
                    key={`medicine-grid-${medicine.id}`}
                    medicine={medicine}
                  />
                ) : (
                  <MedicineCardList
                    key={`medicine-list-${medicine.id}`}
                    medicine={medicine}
                  />
                ),
              )}
            </div>
          )}

          {/* Pagination */}
          {data?.meta && (
            <div className="mt-8">
              <PaginationControl
                currentPage={Number(data.meta.page)}
                totalPages={Math.ceil((data.meta.total || 0) / data.meta.limit)}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
