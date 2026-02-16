import { axiosInstance } from "@/lib/axios";
import { ICreateReviewSchema } from "../schemas/review.schema";

export const reviewService = {
  getAll: async () => {
    const { data } = await axiosInstance.get("/reviews");
    return data;
  },
  create: async (payload: ICreateReviewSchema) => {
    const { data } = await axiosInstance.post("/reviews", payload);
    return data;
  },
};
