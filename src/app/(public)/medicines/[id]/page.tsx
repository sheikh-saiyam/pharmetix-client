"use client";

import { useMedicine } from "@/features/medicine/hooks/use-medicines";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ReviewList } from "@/features/review/components/review-list";
import { useCartStore } from "@/store/cart.store";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { UserRole } from "@/features/auth/schemas/auth.schema";
import { ShoppingCart, Star } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function MedicineDetailsPage() {
  const params = useParams();
  const id = params.id as string;
  const { data, isLoading, isError } = useMedicine(id);
  const medicine = data?.data;
  const { items, addItem } = useCartStore();
  const { user } = useAuth();

  const canAddToCart = !user || user.role === UserRole.CUSTOMER;

  if (isLoading) {
    return (
      <div className="container py-10 space-y-8">
        <div className="grid md:grid-cols-2 gap-8">
          <Skeleton className="active:aspect-square w-full rounded-xl" />
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-24 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (isError || !medicine) {
    return (
      <div className="container py-10 text-center text-red-500">
        Medicine not found
      </div>
    );
  }

  const averageRating =
    medicine.reviews?.reduce((acc, r) => acc + r.rating, 0) ||
    0 / (medicine.reviews?.length || 1);

  return (
    <div className="container py-10">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Image Section */}
        <div className="relative aspect-square w-full bg-muted/20 rounded-xl overflow-hidden shadow-sm">
          <Image
            src={medicine.image || "/placeholder-medicine.png"}
            alt={medicine.brandName}
            fill
            className="object-cover"
          />
          {!medicine.stockQuantity && (
            <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
              <Badge variant="destructive" className="text-lg px-4 py-2">
                Out of Stock
              </Badge>
            </div>
          )}
        </div>

        {/* Details Section */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="mb-2">
                {medicine.category.name}
              </Badge>
              {medicine.stockQuantity > 0 ? (
                <Badge variant="default" className="bg-green-600">
                  In Stock ({medicine.stockQuantity})
                </Badge>
              ) : (
                <Badge variant="destructive">Out of Stock</Badge>
              )}
            </div>

            <h1 className="text-4xl font-bold">{medicine.brandName}</h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xl text-muted-foreground">
                {medicine.genericName}
              </span>
              <span className="text-muted-foreground">•</span>
              <span className="font-medium">{medicine.strength}</span>
              <span className="text-muted-foreground">•</span>
              <span className="text-sm text-muted-foreground">
                {medicine.manufacturer}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
            <span className="font-bold text-lg">
              {averageRating.toFixed(1)}
            </span>
            <span className="text-muted-foreground">
              ({medicine.reviews?.length || 0} reviews)
            </span>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-primary">
              ৳{medicine.price}
            </span>
            <span className="text-sm text-muted-foreground">
              per {medicine.unit}
            </span>
          </div>

          <div className="prose dark:prose-invert max-w-none text-muted-foreground">
            <p>{medicine.description}</p>
          </div>

          <div className="bg-muted/30 p-4 rounded-lg space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Dosage Form:</span>
              <span className="font-medium">{medicine.dosageForm}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Pack Size:</span>
              <span className="font-medium">
                {medicine.packSize} {medicine.unit}s
              </span>
            </div>
            {medicine.dosageInfo && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Dosage Info:</span>
                <span className="font-medium">{medicine.dosageInfo}</span>
              </div>
            )}
          </div>

          <div className="pt-4">
            {canAddToCart && (
              <Button
                size="lg"
                className="w-full md:w-auto min-w-[200px]"
                disabled={medicine.stockQuantity <= 0}
                onClick={() => addItem(medicine)}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
            )}
          </div>
        </div>
      </div>

      <Separator className="my-10" />

      {/* Reviews Section */}
      <div className="max-w-3xl">
        <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
        <ReviewList reviews={medicine.reviews} />
      </div>
    </div>
  );
}
