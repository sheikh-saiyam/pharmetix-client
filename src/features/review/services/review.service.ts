import { fetchApi } from "@/lib/fetch-api";
import { ICreateReviewSchema } from "../schemas/review.schema";
import { ReviewsResponse } from "../review.type";

export const reviewService = {
  getAll: async () => {
    return fetchApi<ReviewsResponse>("/api/v1/reviews", {
      method: "GET",
    });
  },
  create: async (payload: ICreateReviewSchema) => {
    return fetchApi("/api/v1/reviews", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },
};
