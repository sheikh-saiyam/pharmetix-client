"use client";

import { Medicine } from "@/features/medicine/types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { UserRole } from "@/features/auth/schemas/auth.schema";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/cart.store";

interface MedicineCardProps {
  medicine: Medicine;
}

export function MedicineCard({ medicine }: MedicineCardProps) {
  const { user } = useAuth();
  const addItem = useCartStore((state) => state.addItem);

  const canAddToCart = !user || user.role === UserRole.CUSTOMER;

  return (
    <Card className="h-full flex flex-col overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative aspect-square w-full bg-muted/20">
        <Image
          src={medicine.image || "/placeholder-medicine.png"}
          alt={medicine.brandName}
          fill
          className="object-cover"
        />
        {!medicine.stockQuantity && (
          <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
            <Badge variant="destructive">Out of Stock</Badge>
          </div>
        )}
      </div>
      <CardHeader className="p-4 pb-0">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold text-lg leading-tight">
              {medicine.brandName}
            </h3>
            <p className="text-sm text-muted-foreground">
              {medicine.genericName}
            </p>
          </div>
          <Badge variant="outline" className="text-xs">
            {medicine.strength}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-1">
        <div className="flex items-center justify-between mt-2">
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground">
              {medicine.dosageForm}
            </span>
            <p className="font-bold text-primary text-xl">৳{medicine.price}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 gap-2">
        <Button asChild variant="outline" className="flex-1">
          <Link href={`/medicines/${medicine.id}`}>Details</Link>
        </Button>
        {canAddToCart && medicine.stockQuantity > 0 && (
          <Button
            size="icon"
            onClick={() => addItem(medicine)}
            disabled={medicine.stockQuantity <= 0}
          >
            <ShoppingCart className="h-4 w-4" />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
