"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createReviewSchema,
  CreateReviewSchema,
} from "@/features/review/services/review.service";
import { reviewService } from "@/features/review/services/review.service";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useState } from "react";
import { Star } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

interface WriteReviewDialogProps {
  medicineId: string;
  orderId: string;
  medicineName: string;
}

export function WriteReviewDialog({
  medicineId,
  orderId,
  medicineName,
}: WriteReviewDialogProps) {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const form = useForm<CreateReviewSchema>({
    resolver: zodResolver(createReviewSchema),
    defaultValues: {
      medicineId,
      orderId,
      rating: 5,
      comment: "",
    },
  });

  async function onSubmit(values: CreateReviewSchema) {
    try {
      const res = await reviewService.create(values);
      if (res.success) {
        toast.success("Review submitted");
        setOpen(false);
        queryClient.invalidateQueries({ queryKey: ["medicine", medicineId] }); // invalidating medicine detail
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error("Failed to submit review");
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Write Review
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Review for {medicineName}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rating</FormLabel>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`cursor-pointer h-6 w-6 ${
                          star <= field.value
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                        onClick={() => field.onChange(star)}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Comment</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Share your experience..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Submit Review
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
