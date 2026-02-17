import { z } from "zod";

export const medicineSchema = z.object({
  brandName: z.string().min(1, "Brand name is required"),
  genericName: z.string().min(1, "Generic name is required"),
  strength: z.string().min(1, "Strength is required"),
  dosageForm: z.string().min(1, "Dosage form is required"), // Could be enum
  price: z.number().min(0, "Price must be positive"),
  stockQuantity: z.number().min(0, "Stock must be positive"),
  categoryId: z.string().min(1, "Category is required"),
  image: z.string().url("Invalid image URL").optional().or(z.literal("")),
  description: z.string().optional(),
  expiryDate: z.string().min(1, "Expiry date is required"), // ISO string or date
  manufacturer: z.string().optional(), // In backend response but not in create example body? Check docs again.
  // Docs Request Body: brandName, genericName, strength, dosageForm, price, stockQuantity, categoryId, image, description, expiryDate.
  // Docs example: manufacturer is NOT in request body but IS in response. Maybe optional or inferred?
  // I'll add it as optional.
});

export type MedicineSchema = z.infer<typeof medicineSchema>;
