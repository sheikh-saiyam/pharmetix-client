"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { ICategory } from "@/features/medicine/medicine.type";
import { cn } from "@/lib/utils";
import { ChevronRight, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function Sidebar({
  className,
  categories,
}: {
  className: string;
  categories: ICategory[];
}) {
  return (
    <aside
      className={cn(
        "hidden lg:block w-72 border-r border-slate-100 bg-white",
        className,
      )}
    >
      <div className=" h-screen overflow-auto flex flex-col">
        <ScrollArea className="flex-1">
          <div className="flex flex-col">
            {/* Flash Sale - Static Top Item */}
            <div className="group flex items-center justify-between px-4 py-4 border-b border-slate-50 hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-3">
                <Zap className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                <span className="font-bold text-slate-900 italic uppercase">
                  Flash <span className="text-red-500">Sale</span>
                </span>
                <span className="ml-2 px-2 py-0.5 rounded-md border border-slate-200 text-[10px] font-bold text-slate-500">
                  1000+
                </span>
              </div>
            </div>

            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/medicines?categoryId=${category.id}`}
                className="group flex items-center justify-between px-4 py-3 border-b border-slate-50 hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center overflow-hidden p-1.5 group-hover:bg-white transition-colors">
                    {category.image ? (
                      <Image
                        src={category.image}
                        alt={category.name}
                        width={40}
                        height={40}
                        className="h-full w-full object-contain opacity-80 group-hover:opacity-100 transition-opacity"
                      />
                    ) : (
                      <div className="h-full w-full bg-slate-200 animate-pulse rounded-full" />
                    )}
                  </div>
                  <span className="text-[14px] font-medium text-slate-700 group-hover:text-emerald-600 transition-colors">
                    {category.name}
                  </span>
                </div>
                <ChevronRight className="h-4 w-4 text-slate-300 group-hover:text-emerald-600 transition-colors" />
              </Link>
            ))}
          </div>
        </ScrollArea>
      </div>
    </aside>
  );
}
