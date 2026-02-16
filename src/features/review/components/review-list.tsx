import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import { IReview } from "../review.type";

export function ReviewList({ reviews }: { reviews?: IReview[] }) {
  if (!reviews || reviews.length === 0) {
    return <div className="text-muted-foreground">No reviews yet.</div>;
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <Card key={review.id} className="border-none shadow-sm bg-muted/20">
          <CardContent className="p-4 space-y-2">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={review.customer.image} />
                <AvatarFallback>
                  {review.customer.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="font-semibold text-sm">
                  {review.customer.name}
                </span>
                <span className="text-xs text-muted-foreground">
                  {format(new Date(review.createdAt), "MMM d, yyyy")}
                </span>
              </div>
              <div className="ml-auto flex items-center">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                <span className="text-sm font-medium">{review.rating}</span>
              </div>
            </div>
            <p className="text-sm text-foreground/90">{review.comment}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
