"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import { reviewService } from "@/features/review/services/review.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { Star } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  createReviewSchema,
  ICreateReviewSchema,
} from "../schemas/review.schema";

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

  const form = useForm<ICreateReviewSchema>({
    resolver: zodResolver(createReviewSchema),
    defaultValues: {
      medicineId,
      orderId,
      rating: 5,
      comment: "",
    },
  });

  async function onSubmit(values: ICreateReviewSchema) {
    try {
      const res = await reviewService.create(values);
      if (res.success) {
        toast.success("Review submitted successfully");
        setOpen(false);
        queryClient.invalidateQueries({ queryKey: ["medicine", medicineId] });
      } else {
        toast.error(res.message);
      }
    } catch {
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
      <DialogContent className="[&>button]:hidden">
        <DialogHeader className="gap-0 border-b pb-4">
          <DialogTitle className="text-lg">
            Review for {medicineName}
          </DialogTitle>
          <DialogDescription>
            Share your experience with {medicineName}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rating</FormLabel>
                  <div className="flex gap-1 px-4 h-12">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`cursor-pointer h-full w-full ${
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
            <Button type="submit" className="w-1/2 mx-auto flex justify-center">
              {form.formState.isSubmitting ? "Submitting..." : "Submit Review"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
