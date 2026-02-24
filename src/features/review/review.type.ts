import { IMeta } from "@/types/index.type";

export interface IReview {
  id: string;
  rating: number;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
  medicine: {
    id: string;
    slug: string;
    genericName: string;
    brandName: string;
  };
  customer: {
    name: string;
    image: string;
  };
}

export interface ReviewsResponse {
  success: boolean;
  message: string;
  meta: IMeta;
  data: IReview[];
}
