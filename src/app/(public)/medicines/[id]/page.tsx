"use client";

import {
  ChevronLeft,
  Info,
  Minus,
  Plus,
  RotateCcw,
  ShieldCheck,
  ShoppingCart,
  Star,
  Truck,
} from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { UserRole } from "@/features/auth/schemas/auth.schema";
import { useMedicine } from "@/features/medicine/hooks/use-medicines";
import { useCartStore } from "@/store/cart.store";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { ReviewList } from "@/features/review/components/review-list";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function MedicineDetailsPage() {
  const params = useParams();
  const id = params.id as string;
  const { data, isLoading, isError } = useMedicine(id);
  const medicine = data?.data;

  const { addItem } = useCartStore();
  const { user } = useAuth();

  const [quantity, setQuantity] = useState(1);
  const [imgSrc, setImgSrc] = useState<string | null>(null);

  const canAddToCart = !user || user.role === UserRole.CUSTOMER;

  if (isLoading) return <MedicineDetailsSkeleton />;

  if (isError || !medicine) {
    return (
      <div className="container min-h-[60vh] flex flex-col items-center justify-center py-20 text-center">
        <div className="bg-slate-50 p-6 rounded-full mb-4">
          <Info className="h-10 w-10 text-slate-300" />
        </div>
        <h2 className="text-xl font-semibold text-slate-900">
          Medicine not found
        </h2>
        <p className="text-slate-500 mt-2 max-w-xs mx-auto">
          The product you are looking for might have been removed or the URL is
          incorrect.
        </p>
        <Button
          variant="link"
          className="mt-4 text-emerald-600"
          onClick={() => window.history.back()}
        >
          <ChevronLeft className="h-4 w-4 mr-1" /> Go back to shop
        </Button>
      </div>
    );
  }

  const averageRating = medicine.reviews?.length
    ? medicine.reviews.reduce((acc, r) => acc + r.rating, 0) /
      medicine.reviews.length
    : 0;

  return (
    <div className="bg-[#FCFDFE] min-h-screen pb-20">
      <div className="container mx-auto px-6">
        {/* Breadcrumb / Navigation */}
        <div className="py-4">
          <nav className="flex items-center text-sm text-slate-500 mb-4">
            <Link href="/" className="hover:text-emerald-600">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/medicines" className="hover:text-emerald-600">
              Medicines
            </Link>
            <span className="mx-2">/</span>
            <span className="text-slate-900 font-medium truncate">
              {medicine.brandName}
            </span>
          </nav>
        </div>

        <div>
          <div>
            <div className="grid lg:grid-cols-12 gap-0">
              {/* Left Column: Image Section */}
              <div className="lg:col-span-5 p-6 bg-white border border-slate-100 rounded-3xl">
                <div className="sticky top-24">
                  <div className="relative aspect-square w-full bg-slate-50/50 rounded-2xl overflow-hidden group">
                    <Image
                      src={
                        imgSrc || medicine.image || "/placeholder-medicine.png"
                      }
                      alt={medicine.brandName}
                      fill
                      priority
                      className="object-contain p-12 transition-transform duration-700 group-hover:scale-105"
                      onError={() => setImgSrc("/placeholder-medicine.png")}
                    />
                    {medicine.stockQuantity <= 0 && (
                      <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px] flex items-center justify-center">
                        <Badge className="bg-slate-900 text-white px-6 py-2 rounded-full uppercase tracking-widest">
                          Out of Stock
                        </Badge>
                      </div>
                    )}
                  </div>

                  {/* Micro Trust Bar */}
                  <div className="grid grid-cols-3 gap-4 mt-8">
                    <div className="flex flex-col items-center gap-1">
                      <ShieldCheck className="h-5 w-5 text-emerald-500" />
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-tighter">
                        Original
                      </span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <Truck className="h-5 w-5 text-slate-400" />
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-tighter">
                        Express
                      </span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <RotateCcw className="h-5 w-5 text-slate-400" />
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-tighter">
                        Returns
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Details Section */}
              <div className="lg:col-span-7 p-6 md:p-12 space-y-8">
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <Badge
                      variant="outline"
                      className="text-emerald-600 border-emerald-100 bg-emerald-50/30 rounded-md"
                    >
                      {medicine.category.name}
                    </Badge>
                    <span className="text-[13px] font-medium text-slate-400">
                      SKU: {medicine.id.slice(0, 8).toUpperCase()}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h1 className="text-3xl md:text-4xl font-semibold text-slate-900 tracking-tight">
                      {medicine.brandName}
                    </h1>
                    <p className="text-lg text-slate-500 font-medium italic">
                      {medicine.genericName}{" "}
                      <span className="not-italic text-slate-300 mx-2">|</span>{" "}
                      {medicine.strength}
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            "h-4 w-4",
                            i < Math.round(averageRating)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-slate-200",
                          )}
                        />
                      ))}
                    </div>
                    <span className="text-sm font-semibold text-slate-900">
                      {averageRating.toFixed(1)}
                    </span>
                    <span className="text-sm text-slate-400">
                      ({medicine.reviews?.length || 0} reviews)
                    </span>
                  </div>
                </div>

                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-slate-900">
                    ৳{medicine.price}
                  </span>
                  <span className="text-slate-400 font-medium">
                    / {medicine.unit}
                  </span>
                </div>

                <Separator className="bg-slate-50" />

                {/* Specs Grid */}
                <div className="grid sm:grid-cols-2 gap-y-6 gap-x-12 text-sm">
                  <div className="space-y-1">
                    <span className="text-slate-400 font-medium uppercase text-[10px] tracking-widest">
                      Manufacturer
                    </span>
                    <p className="text-slate-900 font-semibold">
                      {medicine.manufacturer}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-slate-400 font-medium uppercase text-[10px] tracking-widest">
                      Dosage Form
                    </span>
                    <p className="text-slate-900 font-semibold">
                      {medicine.dosageForm}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-slate-400 font-medium uppercase text-[10px] tracking-widest">
                      Pack Size
                    </span>
                    <p className="text-slate-900 font-semibold">
                      {medicine.packSize} {medicine.unit}s
                    </p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-slate-400 font-medium uppercase text-[10px] tracking-widest">
                      Availability
                    </span>
                    <p
                      className={cn(
                        "font-semibold",
                        medicine.stockQuantity > 0
                          ? "text-emerald-600"
                          : "text-red-500",
                      )}
                    >
                      {medicine.stockQuantity > 0
                        ? `In Stock (${medicine.stockQuantity})`
                        : "Out of Stock"}
                    </p>
                  </div>
                </div>

                {/* Description Block */}
                <div className="bg-slate-50/50 p-6 rounded-2xl border border-slate-100">
                  <h3 className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-2">
                    <Info className="h-4 w-4 text-emerald-500" />
                    Product Description
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {medicine.description ||
                      "No detailed description available for this product."}
                  </p>
                </div>

                {/* Action Bar */}
                <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                  {canAddToCart && (
                    <>
                      <div className="flex items-center bg-white border border-slate-200 rounded-xl h-14 p-1 w-full sm:w-auto">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="rounded-lg h-full px-3 text-slate-500 hover:text-emerald-600"
                          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                          disabled={quantity <= 1}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-12 text-center font-bold text-slate-900 text-lg">
                          {quantity}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="rounded-lg h-full px-3 text-slate-500 hover:text-emerald-600"
                          onClick={() =>
                            setQuantity((q) =>
                              Math.min(medicine.stockQuantity, q + 1),
                            )
                          }
                          disabled={quantity >= medicine.stockQuantity}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>

                      <Button
                        size="lg"
                        className="w-full sm:flex-1 h-14 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg shadow-emerald-600/10 transition-all hover:scale-[1.01] active:scale-[0.99]"
                        disabled={medicine.stockQuantity <= 0}
                        onClick={() =>
                          addItem({ ...medicine, stockQuantity: quantity })
                        }
                      >
                        <ShoppingCart className="mr-2 h-5 w-5" />
                        Add to Cart — ৳
                        {(medicine.price * quantity).toLocaleString()}
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="mt-16 max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-2xl font-semibold text-slate-900">
                Customer Reviews
              </h2>
              <div className="h-px flex-1 bg-slate-100 mx-6 hidden sm:block" />
              <Button variant="outline" className="rounded-full">
                Write a Review
              </Button>
            </div>
            <ReviewList reviews={medicine.reviews} />
          </div>
        </div>
      </div>
    </div>
  );
}

function MedicineDetailsSkeleton() {
  return (
    <div className="container py-12 animate-pulse">
      <div className="bg-white rounded-[2rem] border border-slate-100 h-[600px] grid lg:grid-cols-12 overflow-hidden">
        <div className="lg:col-span-5 p-10 border-r border-slate-50">
          <Skeleton className="aspect-square w-full rounded-2xl" />
        </div>
        <div className="lg:col-span-7 p-12 space-y-6">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-12 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <div className="space-y-4 pt-10">
            <Skeleton className="h-20 w-full rounded-2xl" />
            <Skeleton className="h-14 w-full rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
