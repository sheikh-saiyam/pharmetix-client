"use client";

import { MedicineCard } from "@/features/medicine/components/medicine-card";
import { IMedicine } from "@/features/medicine/medicine.type";
import Link from "next/link";
import { ChevronRight } from "lucide-react"; // Added for better visual cue
import { cn } from "@/lib/utils";

interface ProductShowcaseProps {
  title: string;
  subtitle?: string; // Added optional subtitle
  products: IMedicine[];
  linkHref?: string;
  linkText?: string;
  barBgColor?: string;
  actionButtonClassname?: string;
  className?: string;
  medicineCardColor?: string;
}

export function ProductShowcase({
  title,
  subtitle,
  products,
  linkHref = "/medicines",
  linkText = "See All",
  barBgColor = "bg-primary",
  actionButtonClassname,
  className,
  medicineCardColor = "oklch(0.58 0.23 145)",
}: ProductShowcaseProps) {
  return (
    <section className={cn("py-12", className)}>
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        {/* Title Group */}
        <div className="relative pl-4">
          {/* Medical Accent Bar */}
          <div
            className={`absolute left-0 top-0 bottom-0 w-1 ${barBgColor} rounded-full`}
          />

          <h2 className="text-2xl font-black text-slate-900 sm:text-3xl">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-2 text-slate-500 text-sm font-medium uppercase tracking-wider">
              {subtitle}
            </p>
          )}
        </div>

        {/* Action Button */}
        <Link
          href={linkHref}
          className={cn(
            "group flex items-center gap-1 text-sm font-bold text-teal-600 hover:text-teal-700 transition-colors bg-teal-50 px-4 py-2 rounded-full w-fit",
            barBgColor,
            actionButtonClassname,
          )}
        >
          {linkText}
          <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <MedicineCard
            key={`product-showcase-${product.id}`}
            medicine={product}
            primaryColor={medicineCardColor}
          />
        ))}
      </div>
    </section>
  );
}
