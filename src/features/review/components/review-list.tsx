import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { IMedicineReview } from "@/features/medicine/medicine.type";
import { format } from "date-fns";
import { Star, CheckCircle2 } from "lucide-react";

export function ReviewList({ reviews }: { reviews?: IMedicineReview[] }) {
  if (!reviews || reviews.length === 0) {
    return (
      <Card className="border-dashed border-2 bg-muted/5">
        <CardContent className="py-10 text-center">
          <p className="text-muted-foreground">
            No reviews yet. Be the first to share your experience!
          </p>
        </CardContent>
      </Card>
    );
  }

  // Calculate statistics
  const totalReviews = reviews.length;
  const averageRating =
    reviews.reduce((acc, curr) => acc + curr.rating, 0) / totalReviews;

  const distribution = [5, 4, 3, 2, 1].map((stars) => ({
    stars,
    count: reviews.filter((r) => r.rating === stars).length,
    percentage:
      (reviews.filter((r) => r.rating === stars).length / totalReviews) * 100,
  }));

  return (
    <div className="space-y-12">
      {/* Review Summary Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
        <div className="md:col-span-4 flex flex-col items-center justify-center p-8 bg-slate-50 rounded-3xl border border-slate-100 shadow-sm">
          <span className="text-6xl font-black text-slate-900 mb-2">
            {averageRating.toFixed(1)}
          </span>
          <div className="flex gap-1 mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-5 w-5 ${
                  star <= Math.round(averageRating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-slate-200 fill-slate-200"
                }`}
              />
            ))}
          </div>
          <span className="text-sm font-medium text-slate-500">
            Based on {totalReviews} {totalReviews === 1 ? "review" : "reviews"}
          </span>
        </div>

        <div className="md:col-span-8 space-y-3">
          {distribution.map((item) => (
            <div key={item.stars} className="flex items-center gap-4 group">
              <div className="flex items-center gap-1.5 w-12 shrink-0">
                <span className="text-sm font-bold text-slate-700">
                  {item.stars}
                </span>
                <Star className="h-3 w-3 fill-slate-400 text-slate-400" />
              </div>
              <Progress value={item.percentage} className="h-2 flex-1" />
              <span className="text-xs font-semibold text-slate-400 w-10 text-right group-hover:text-slate-900 transition-colors">
                {Math.round(item.percentage)}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <Card
            key={review.id}
            className="group overflow-hidden border-slate-100 shadow-sm hover:shadow-md hover:border-indigo-100 transition-all duration-300"
          >
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="flex items-start gap-4 shrink-0">
                  <Avatar className="h-12 w-12 border-2 border-slate-50 ring-2 ring-indigo-50/50">
                    <AvatarImage src={review.customer.image} />
                    <AvatarFallback className="bg-linear-to-br from-indigo-500 to-purple-600 text-white font-bold">
                      {review.customer.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="sm:hidden">
                    <h4 className="font-bold text-slate-900">
                      {review.customer.name}
                    </h4>
                    <p className="text-xs text-slate-400 italic">
                      {format(new Date(review.createdAt), "MMMM d, yyyy")}
                    </p>
                  </div>
                </div>

                <div className="flex-1 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="hidden sm:block">
                      <div className="flex items-center gap-2 mb-0.5">
                        <h4 className="font-bold text-slate-900">
                          {review.customer.name}
                        </h4>
                        <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-[10px] font-bold text-emerald-600 border border-emerald-100">
                          <CheckCircle2 className="h-3 w-3" />
                          Verified Purchase
                        </div>
                      </div>
                      <p className="text-xs text-slate-400 italic">
                        {format(new Date(review.createdAt), "MMMM d, yyyy")}
                      </p>
                    </div>

                    <div className="flex items-center gap-1 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-100 self-start">
                      <div className="flex gap-0.5 mr-1.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-3 w-3 ${
                              star <= review.rating
                                ? "fill-amber-400 text-amber-400"
                                : "text-amber-200 fill-amber-200"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm font-black text-amber-700">
                        {review.rating}
                      </span>
                    </div>
                  </div>

                  <p className="text-slate-600 leading-relaxed text-[15px]">
                    {review.comment}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
