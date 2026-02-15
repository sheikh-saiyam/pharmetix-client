import { axiosInstance } from "@/lib/axios";
import { z } from "zod";

export const createReviewSchema = z.object({
  medicineId: z.string().uuid(),
  orderId: z.string().uuid(),
  rating: z.number().min(1).max(5),
  comment: z.string().min(1, "Comment is required"),
});

export type CreateReviewSchema = z.infer<typeof createReviewSchema>;

export const reviewService = {
  create: async (payload: CreateReviewSchema) => {
    const { data } = await axiosInstance.post("/reviews", payload);
    return data;
  },
};
