import { z } from "zod";

export const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  image: z.string().optional(),
});

export type IProfileFormValues = z.infer<typeof profileSchema>;
