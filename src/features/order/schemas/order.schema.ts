import { z } from "zod";

export const createOrderSchema = z.object({
  shippingName: z.string().min(1, "Name is required"),
  shippingPhone: z
    .string()
    .min(1, "Phone is required")
    .regex(/^\d+$/, "Invalid phone number"),
  shippingAddress: z.string().min(1, "Address is required"),
  shippingCity: z.string().min(1, "City is required"),
  shippingPostalCode: z.string().min(1, "Postal code is required"),
  orderItems: z
    .array(
      z.object({
        medicineId: z.string().uuid(),
        quantity: z.number().min(1),
      }),
    )
    .min(1, "Order must have at least one item"),
});

export type CreateOrderSchema = z.infer<typeof createOrderSchema>;
