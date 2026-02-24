import { fetchApi } from "@/lib/fetch-api";
import { CreateReviewResponse, ReviewsResponse } from "../review.type";
import { ICreateReviewSchema } from "../schemas/review.schema";

export const reviewService = {
  getAll: async () => {
    return fetchApi<ReviewsResponse>("/api/v1/reviews", {
      method: "GET",
    });
  },
  create: async (payload: ICreateReviewSchema) => {
    return fetchApi<CreateReviewResponse>("/api/v1/reviews", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },
};
