export interface Category {
  id: string;
  name: string;
  slug: string;
  image?: string;
  description?: string;
  _count?: {
    medicines: number;
  };
}

export interface Medicine {
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
  category: Category;
  seller?: {
    name: string;
    email: string;
  };
  reviews?: Review[];
  _count?: {
    reviews: number;
    orderItems: number;
  };
}

export interface Review {
  id: string;
  rating: number;
  comment: string;
  customer: {
    name: string;
    image?: string;
  };
  createdAt: string;
}

export interface MedicinesResponse {
  success: boolean;
  message: string;
  meta: {
    total: number;
    page: number;
    totalPages: number;
    limit: number;
    skip: number;
  };
  data: Medicine[];
}

export interface MedicineResponse {
  success: boolean;
  message: string;
  data: Medicine;
}

export interface CategoriesResponse {
  success: boolean;
  message: string;
  meta?: {
    total: number;
    page: number;
    totalPages: number;
    limit: number;
  };
  data: Category[];
}
