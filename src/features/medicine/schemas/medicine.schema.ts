import { z } from "zod";

export const medicineSchema = z.object({
  brandName: z.string().min(1, "Brand name is required"),
  genericName: z.string().min(1, "Generic name is required"),
  manufacturer: z.string().min(1, "Manufacturer is required"),
  isFeatured: z.boolean().default(false),
  strength: z.string().min(1, "Strength is required"),
  dosageForm: z.string().min(1, "Dosage form is required"),
  unit: z.string().min(1, "Unit is required"),
  packSize: z.number().int().min(1, "Pack size must be at least 1"),
  dosageInfo: z.string().optional(),
  price: z.number().min(0, "Price must be positive"),
  piecePrice: z.number().min(0, "Piece price must be positive").optional(),
  stockQuantity: z.number().int().min(0, "Stock must be positive"),
  categoryId: z.string().min(1, "Category is required"),
  image: z.string().url("Invalid image URL").optional().or(z.literal("")),
  description: z.string().optional(),
  expiryDate: z.string().min(1, "Expiry date is required"),
});

export type MedicineSchema = z.infer<typeof medicineSchema>;
