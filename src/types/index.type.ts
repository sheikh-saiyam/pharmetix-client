export interface IMeta {
  total: number;
  page: number;
  totalPages: number;
  limit: number;
  skip: number;
}
export interface IFetchParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}
