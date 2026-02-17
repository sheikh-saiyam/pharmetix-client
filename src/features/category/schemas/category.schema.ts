import { z } from "zod";

export const categorySchema = z.object({
  name: z.string().min(1, "Name is required"),
  image: z.string().url("Invalid URL").optional().or(z.literal("")),
  description: z.string().optional(),
});

export type CategorySchema = z.infer<typeof categorySchema>;
