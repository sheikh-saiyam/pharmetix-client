"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { UserRole } from "@/features/auth/schemas/auth.schema";
import { IMedicine } from "@/features/medicine/medicine.type";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/cart.store";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface MedicineCardProps {
  medicine: IMedicine;
  primaryColor?: string; // Dynamic color prop
}

export function MedicineCard({
  medicine,
  primaryColor = "oklch(0.58 0.23 145)",
}: MedicineCardProps) {
  const { user } = useAuth();
  const addItem = useCartStore((state) => state.addItem);

  const canAddToCart = !user || user.role === UserRole.CUSTOMER;
  const isOutOfStock = medicine.stockQuantity <= 0;

  return (
    <Link href={`/medicines/${medicine.slug}`}>
      <Card
        // We set a local CSS variable --brand-primary
        style={{ "--brand-primary": primaryColor } as React.CSSProperties}
        className="group relative h-full flex flex-col border-slate-100 bg-white hover:border-[var(--brand-primary)] hover:shadow-lg hover:shadow-[var(--brand-primary)]/5 transition-all duration-300 pt-0 pb-4 overflow-hidden"
      >
        {/* Image Section */}
        <div className="relative aspect-4/3 w-full overflow-hidden bg-slate-50 p-4">
          <Image
            src={medicine.image || "/placeholder-medicine.png"}
            alt={medicine.brandName}
            fill
            className="object-contain p-6 mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
          />

          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {medicine.dosageForm && (
              <Badge
                variant="secondary"
                className="bg-white/80 backdrop-blur-sm text-[10px] font-medium uppercase tracking-wider text-slate-500 border-none shadow-sm"
              >
                {medicine.dosageForm}
              </Badge>
            )}
          </div>

          {isOutOfStock && (
            <div className="absolute inset-0 bg-slate-50/60 backdrop-blur-[1px] flex items-center justify-center z-10">
              <Badge className="bg-rose-500 hover:bg-rose-500 text-white border-none shadow-lg">
                Out of Stock
              </Badge>
            </div>
          )}
        </div>

        {/* Content Section */}
        <CardContent className="flex flex-col flex-1 px-5 py-0">
          <div className="mb-2">
            <p className="text-[12px] font-bold text-[var(--brand-primary)] mb-1 group-hover:text-slate-800">
              {medicine.manufacturer}
            </p>
            <h3 className="font-bold text-slate-800 text-lg leading-tight group-hover:text-[var(--brand-primary)] transition-colors line-clamp-1">
              {medicine.brandName}
            </h3>
            <p className="text-sm italic text-slate-400 line-clamp-1">
              {medicine.genericName} • {medicine.strength}
            </p>
          </div>

          <div className="mt-auto pt-4 flex items-center justify-between border-t border-slate-50">
            <div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-slate-900">
                  ৳{medicine.price}
                </span>
                <span className="text-[10px] text-slate-400 font-medium uppercase tracking-tighter">
                  / {medicine.unit || "Pack"}
                </span>
              </div>
            </div>

            <div className="flex gap-2">
              {canAddToCart && !isOutOfStock && (
                <Button
                  size="icon"
                  style={{ backgroundColor: "var(--brand-primary)" }}
                  className="h-9 w-9 rounded-full hover:opacity-90 shadow-xs shadow-[var(--brand-primary)] transition-all active:scale-95"
                  onClick={(e) => {
                    e.preventDefault(); // Prevent Link navigation
                    addItem(medicine);
                  }}
                >
                  <ShoppingCart className="h-4 w-4 text-white" />
                </Button>
              )}
            </div>
          </div>
        </CardContent>

        <div className="flex items-center justify-between px-5">
          {!isOutOfStock && (
            <div className="flex items-center gap-1.5">
              <div
                style={{ backgroundColor: "var(--brand-primary)" }}
                className={cn(
                  "h-2.5 w-2.5 rounded-full",
                  medicine.stockQuantity < 10
                    ? "bg-amber-400 animate-pulse"
                    : "",
                )}
              />
              <span className="text-[12px] font-medium text-slate-400 uppercase tracking-tight">
                {medicine.stockQuantity < 10
                  ? `Only ${medicine.stockQuantity} left`
                  : "In Stock"}
              </span>
            </div>
          )}
        </div>
      </Card>
    </Link>
  );
}
