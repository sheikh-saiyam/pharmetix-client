import z from "zod";

export const createReviewSchema = z.object({
  medicineId: z.string().uuid(),
  orderId: z.string().uuid(),
  rating: z.number().min(1).max(5),
  comment: z.string().min(1, "Comment is required"),
});

export type ICreateReviewSchema = z.infer<typeof createReviewSchema>;
