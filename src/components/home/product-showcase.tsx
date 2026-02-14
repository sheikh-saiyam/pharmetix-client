import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  isNew?: boolean;
  discount?: number;
}

interface ProductShowcaseProps {
  title: string;
  products: Product[];
  linkHref?: string;
  linkText?: string;
  className?: string;
}

export function ProductShowcase({
  title,
  products,
  linkHref = "/medicines",
  linkText = "See All",
  className,
}: ProductShowcaseProps) {
  return (
    <section className={`py-8 ${className || ""}`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
        <Link
          href={linkHref}
          className="text-sm font-medium text-primary hover:underline"
        >
          {linkText}
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {products.map((product) => (
          <Card
            key={product.id}
            className="overflow-hidden group h-full flex flex-col hover:shadow-lg transition-shadow"
          >
            <div className="relative aspect-square bg-muted/20 p-4 flex items-center justify-center">
              {product.isNew && (
                <Badge className="absolute top-2 left-2 bg-green-500 hover:bg-green-600">
                  New
                </Badge>
              )}
              {product.discount && (
                <Badge variant="destructive" className="absolute top-2 right-2">
                  -{product.discount}%
                </Badge>
              )}
              {/* Fallback placeholder since we don't have real images yet */}
              <div className="w-full h-full bg-white rounded-md flex items-center justify-center text-muted-foreground text-xs font-mono">
                {product.image ? (
                  <span className="sr-only">{product.name}</span>
                ) : (
                  // In a real app, use next/image here
                  "No Image"
                )}
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center">
                  Product
                </div>
              </div>
            </div>
            <CardContent className="p-4 flex-1">
              <div className="text-xs text-muted-foreground mb-2">
                {product.category}
              </div>
              <h3 className="font-semibold text-sm line-clamp-2 mb-2 group-hover:text-primary transition-colors">
                {product.name}
              </h3>
              <div className="flex items-baseline gap-2">
                <span className="text-lg font-bold">৳{product.price}</span>
                {product.originalPrice && (
                  <span className="text-sm text-muted-foreground line-through">
                    ৳{product.originalPrice}
                  </span>
                )}
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Button className="w-full" size="sm" variant="secondary">
                <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
