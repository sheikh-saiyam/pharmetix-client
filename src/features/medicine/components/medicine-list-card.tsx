"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { IMedicine } from "../medicine.type";
import { useCartStore } from "@/store/cart.store";

interface MedicineListProps {
  medicine: IMedicine;
}

export function MedicineCardList({ medicine }: MedicineListProps) {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <div className="group relative flex flex-col md:flex-row gap-4 p-4 border rounded-xl bg-card hover:shadow-md shadow-muted transition-all duration-300">
      {/* Image Section */}
      <Link
        href={`/medicines/${medicine.id}`}
        className="relative w-full md:w-48 h-48 md:h-auto shrink-0 overflow-hidden rounded-lg bg-muted"
      >
        {medicine.image ? (
          <Image
            src={medicine.image}
            alt={medicine.brandName}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full text-muted-foreground">
            No Image
          </div>
        )}
        {medicine.stockQuantity <= 0 && (
          <div className="absolute top-2 right-2">
            <Badge variant="destructive">Out of Stock</Badge>
          </div>
        )}
      </Link>

      {/* Content Section */}
      <div className="flex flex-1 flex-col justify-between space-y-4 md:space-y-0">
        <Link href={`/medicines/${medicine.id}`} className="space-y-2">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-lg hover:text-primary transition-colors cursor-pointer">
                {medicine.brandName}
              </h3>

              <p className="text-sm text-muted-foreground">
                {medicine.genericName}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
            <span className="px-2 py-1 bg-secondary rounded-md">
              {medicine.strength}
            </span>
            <span className="px-2 py-1 bg-secondary rounded-md">
              {medicine.dosageForm}
            </span>
            <span className="px-2 py-1 bg-secondary rounded-md">
              {medicine.manufacturer}
            </span>
          </div>
        </Link>
        <div className="flex items-center justify-between md:pt-4">
          <div className="flex gap-1 items-center">
            <div className="text-xl font-bold text-primary">
              <span className="font-extrabold">৳ </span>
              {medicine.price}
            </div>
            {medicine.piecePrice && (
              <div className="mt-0.5 text-xs text-muted-foreground">
                (৳{medicine.piecePrice} / piece)
              </div>
            )}
          </div>

          <Button onClick={() => addItem(medicine)} size="sm" className="gap-2">
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}
