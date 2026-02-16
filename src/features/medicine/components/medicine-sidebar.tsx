"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Skeleton } from "@/components/ui/skeleton";
import { useCategories } from "@/features/category/hooks/use-categories";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export function MedicineSidebar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: categories, isLoading } = useCategories({
    limit: 100,
  });

  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");

  useEffect(() => {
    const sMin = searchParams.get("minPrice") || "";
    const sMax = searchParams.get("maxPrice") || "";
    if (sMin !== minPrice) setMinPrice(sMin);
    if (sMax !== maxPrice) setMaxPrice(sMax);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const updateParam = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    // Reset page to 1 when filter changes
    params.set("page", "1");
    router.push(`/medicines?${params.toString()}`);
  };

  const handlePriceApply = () => {
    const params = new URLSearchParams(searchParams.toString());
    if (minPrice) params.set("minPrice", minPrice);
    else params.delete("minPrice");

    if (maxPrice) params.set("maxPrice", maxPrice);
    else params.delete("maxPrice");

    params.set("page", "1");
    router.push(`/medicines?${params.toString()}`);
  };

  const clearFilters = () => {
    router.push("/medicines");
  };

  return (
    <div className="space-y-6 border shadow-lg shadow-muted rounded-md py-5">
      <div className="flex items-center justify-between pb-4 px-4 border-b">
        <h3 className="font-medium text-lg">Filters</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={clearFilters}
          className="h-auto px-2 py-0.5 hover:bg-destructive/10 text-destructive hover:text-destructive"
        >
          Clear
        </Button>
      </div>

      {/* Price Range */}
      <div className="space-y-4">
        <div className="flex items-center justify-between -mt-2 pb-3 px-4 border-b">
          <h4 className="font-medium">Price Range</h4>
          <Button
            variant="ghost"
            size="sm"
            className="h-auto px-2 py-0.5 hover:bg-destructive/10 text-xs text-destructive hover:text-destructive"
            onClick={() => {
              setMinPrice("");
              setMaxPrice("");
              const params = new URLSearchParams(searchParams.toString());
              params.delete("minPrice");
              params.delete("maxPrice");
              router.push(`/medicines?${params.toString()}`);
            }}
          >
            Clear
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-2 px-4">
          <div className="space-y-1">
            <Label
              htmlFor="min-price"
              className="text-xs text-muted-foreground"
            >
              Min
            </Label>
            <div className="relative">
              <span className="absolute left-2.5 top-2.5 text-xs text-muted-foreground">
                ৳
              </span>
              <Input
                id="min-price"
                type="number"
                placeholder="0"
                className="pl-6 h-9"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-1">
            <Label
              htmlFor="max-price"
              className="text-xs text-muted-foreground"
            >
              Max
            </Label>
            <div className="relative">
              <span className="absolute left-2.5 top-2.5 text-xs text-muted-foreground">
                ৳
              </span>
              <Input
                id="max-price"
                type="number"
                placeholder="1000+"
                className="pl-6 h-9"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="px-4">
          <Button
            size="sm"
            variant="secondary"
            className="w-full h-8"
            onClick={handlePriceApply}
          >
            Apply Price
          </Button>
        </div>
      </div>

      {/* Categories */}
      <div className="space-y-4">
        <div className="flex items-center justify-between py-4 px-4 border-b border-t">
          <h4 className="font-medium">Category</h4>
          <Button
            variant="ghost"
            size="sm"
            className="h-auto px-2 py-0.5 hover:bg-destructive/10 text-xs text-destructive hover:text-destructive"
            onClick={() => updateParam("categoryId", null)}
          >
            Clear
          </Button>
        </div>
        {isLoading ? (
          Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className="flex items-center space-x-2 px-4">
              <Skeleton className="h-4 w-4 rounded-full" />
              <Skeleton className="h-4 w-40" />
            </div>
          ))
        ) : (
          <RadioGroup
            value={searchParams.get("categoryId") || ""}
            onValueChange={(val) => updateParam("categoryId", val)}
            className="px-4"
          >
            <div className="flex flex-col space-y-2 max-h-[500px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent">
              {categories?.data?.map((category) => (
                <div key={category.id} className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={category.id}
                    id={`cat-${category.id}`}
                  />
                  <Label
                    htmlFor={`cat-${category.id}`}
                    className="text-sm font-normal cursor-pointer hover:text-primary"
                  >
                    {category.name}
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        )}
      </div>

      {/* Other Filters */}
      <div className="space-y-4">
        <h4 className="font-medium py-4 px-4 border-b border-t">Others</h4>
        <div className="flex items-center space-x-2 px-4">
          <Checkbox
            id="featured"
            checked={searchParams.get("isFeatured") === "true"}
            onCheckedChange={(checked) =>
              updateParam("isFeatured", checked ? "true" : null)
            }
          />
          <Label
            htmlFor="featured"
            className="text-sm font-normal cursor-pointer"
          >
            Featured Products
          </Label>
        </div>
        {/* Manufacturer Filter (optional, reusing search concept or just a simple input if needed) */}
      </div>
    </div>
  );
}
