"use client";

import { Card } from "@/components/ui/card";
import { ICategory } from "@/features/medicine/medicine.type";
import Image from "next/image";
import Link from "next/link";

export function CategoryGrid({ categories }: { categories: ICategory[] }) {
  return (
    <section className="py-12 bg-white">
      <div>
        {/* Header Section */}
        <div className="flex items-end justify-between mb-8">
          <div className="space-y-1">
            <h2 className="text-2xl md:text-3xl font-semibold text-slate-900 tracking-tight">
              Browse by Category
            </h2>
            <p className="text-lg font-medium text-slate-600">
              Find exactly what you need from our verified health essentials.
            </p>
          </div>
        </div>

        {/* Grid Structure */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/medicines?categoryId=${category.id}`}
              className="group block"
            >
              <Card className="relative h-full border border-slate-100 bg-white shadow-xs hover:shadow-xl hover:shadow-emerald-500/5 hover:-translate-y-1 transition-all duration-300 rounded-[1rem] overflow-hidden">
                <div className="flex flex-col items-center p-4 space-y-4">
                  {/* Icon/Image Container */}
                  <div className="relative h-16 w-16 md:h-20 md:w-20 rounded-md bg-slate-50 flex items-center justify-center p-4 group-hover:bg-primary/50 transition-colors duration-300">
                    {category.image ? (
                      <Image
                        src={category.image}
                        alt={category.name}
                        width={80}
                        height={80}
                        className="object-contain opacity-80 group-hover:opacity-100 transition-opacity"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "https://www.svgrepo.com/show/475127/healthcare.svg";
                        }}
                      />
                    ) : (
                      <div className="h-full w-full rounded-full bg-slate-200 animate-pulse" />
                    )}
                  </div>

                  {/* Text Label */}
                  <div className="text-center">
                    <span className="block text-lg font-semibold text-slate-700 group-hover:text-emerald-600 transition-colors line-clamp-1">
                      {category.name}
                    </span>
                  </div>
                </div>

                {/* Subtle bottom indicator */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary/50 scale-x-0 group-hover:scale-x-100 transition-transform origin-center" />
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
