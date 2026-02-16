"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { IReview } from "@/features/review/review.type";
import { cn } from "@/lib/utils";
import { CheckCircle2, Star } from "lucide-react";

export function ReviewsSection({ reviews }: { reviews: IReview[] }) {
  return (
    <section className="py-16 bg-white">
      <div>
        {/* Minimal Header */}
        <div className="flex flex-col md:flex-row items-baseline justify-between gap-4 mb-8 pb-6">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900 tracking-tight">
              Customer Experience
            </h2>
            <p className="text-lg font-medium text-slate-600">
              Real feedback from our verified community.
            </p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-100 text-[11px] font-bold text-slate-600 uppercase tracking-wider">
            <CheckCircle2 className="h-3 w-3 text-emerald-500" />
            1k+ Happy Users
          </div>
        </div>

        {/* Minimal Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {reviews.map((review) => (
            <Card
              key={review.id}
              className="border-none bg-slate-50/40 hover:bg-white hover:shadow-md hover:shadow-slate-200/50 transition-all duration-300 rounded-xl overflow-hidden shadow-xs"
            >
              <CardContent className="px-4 flex flex-col h-full">
                {/* Compact Rating */}
                <div className="flex items-center gap-0.5 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "h-5 w-5",
                        i < review.rating
                          ? "fill-amber-400 text-amber-400"
                          : "text-slate-200",
                      )}
                    />
                  ))}
                </div>

                {/* Review Content - Clean Typography */}
                <div className="flex-1">
                  <p className="text-slate-600 text-[16px] leading-relaxed line-clamp-4 font-normal">
                    {review.comment}
                  </p>
                </div>

                {/* Simplified Profile */}
                <div className="flex items-center gap-3 mt-4 pt-4 border-t border-slate-100/50">
                  <Avatar className="h-8 w-8 grayscale-[0.5]">
                    <AvatarImage
                      src={review.customer.image}
                      alt={review.customer.name}
                    />
                    <AvatarFallback className="bg-slate-100 text-[10px] font-bold">
                      {review.customer.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex flex-col min-w-0">
                    <span className="text-xs font-bold text-slate-900 truncate">
                      {review.customer.name}
                    </span>
                    <span className="text-[10px] text-emerald-600 font-medium flex items-center gap-1">
                      Verified Buyer
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
