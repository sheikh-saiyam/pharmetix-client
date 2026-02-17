import { IMeta } from "@/types/index.type";

export interface ICategory {
  id: string;
  name: string;
  slug: string;
  image?: string;
  description?: string;
  createdAt: string;
  _count?: {
    medicines: number;
  };
}

export interface IMedicine {
  id: string;
  slug: string;
  brandName: string;
  genericName: string;
  manufacturer: string;
  strength: string;
  dosageForm: string; // "TABLET", "SYRUP", etc.
  unit: string;
  packSize: number;
  dosageInfo?: string;
  price: number;
  piecePrice?: number;
  stockQuantity: number;
  expiryDate: string;
  isActive: boolean;
  image?: string;
  description?: string;
  category: ICategory;
  createdAt: string;
  seller?: {
    name: string;
    email: string;
  };
  reviews?: IMedicineReview[];
  _count?: {
    reviews: number;
    orderItems: number;
  };
}

export interface IMedicineReview {
  id: string;
  rating: number;
  comment: string;
  customer: {
    name: string;
    image?: string;
  };
  createdAt: string;
}

export interface IMedicinesResponse {
  success: boolean;
  message: string;
  meta: IMeta;
  data: IMedicine[];
}

export interface IMedicineResponse {
  success: boolean;
  message: string;
  data: IMedicine;
}

export interface ICategoriesResponse {
  success: boolean;
  message: string;
  meta?: IMeta;
  data: ICategory[];
}

export interface IGetMedicinesParams {
  page?: number;
  limit?: number;
  search?: string;
  searchTerm?: string;
  status?: string;
  manufacturer?: string;
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
  isFeatured?: boolean;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}
