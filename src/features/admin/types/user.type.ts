import { IMeta } from "@/types/index.type";
import { IUser } from "@/types/user.type";

export interface IGetUsersResponse {
  success: boolean;
  message: string;
  meta: IMeta;
  data: IUser[];
}

export interface IGetUsersParams {
  page?: number;
  limit?: number;
  role?: string;
  searchTerm?: string;
  status?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}
