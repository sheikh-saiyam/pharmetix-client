"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "Rahim Ahmed",
    role: "Verified Customer",
    content:
      "Pharmetix has made getting my monthly medicines so easy. Genuine products and fast delivery!",
    rating: 5,
    avatar: "/avatars/01.png",
  },
  {
    id: 2,
    name: "Fatima Begum",
    role: "Verified Customer",
    content:
      "I love the 'Especially For You' section. Recommended products are always spot on for my needs.",
    rating: 5,
    avatar: "/avatars/02.png",
  },
  {
    id: 3,
    name: "Tanvir Hasan",
    role: "Verified Customer",
    content:
      "Great discounts on OTC medicines. The app is very user friendly and the sidebar makes navigation a breeze.",
    rating: 4,
    avatar: "/avatars/03.png",
  },
  {
    id: 4,
    name: "Nusrat Jahan",
    role: "Verified Customer",
    content:
      "Excellent service! The customer support is very helpful and responsive.",
    rating: 5,
    avatar: "/avatars/04.png",
  },
];

export function ReviewsSection() {
  // Basic auto-scroll implementation or just a grid for now since we don't have a complex carousel lib installed yet (except maybe manual logic)
  // We will use a flexible grid layout for reviews for simplicity and robustness.
  return (
    <section className="py-12 bg-muted/30 rounded-xl my-8">
      <div className="container px-4">
        <h2 className="text-2xl font-bold tracking-tight text-center mb-8">
          What Our Customers Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((review) => (
            <Card
              key={review.id}
              className="border-none shadow-sm hover:shadow-md transition-shadow"
            >
              <CardContent className="p-6 flex flex-col gap-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < review.rating ? "fill-amber-400 text-amber-400" : "text-muted-foreground"}`}
                    />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground line-clamp-3 italic">
                  &quot;{review.content}&quot;
                </p>
                <div className="flex items-center gap-3 mt-auto">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={review.avatar} alt={review.name} />
                    <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold">{review.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {review.role}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
