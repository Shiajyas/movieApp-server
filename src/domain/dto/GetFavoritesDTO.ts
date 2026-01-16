

import { Movie } from "../../domain/entities/Movie";

export interface GetFavoritesRequest {
  userId: string;
  page: number;
  limit: number;
}

export interface GetFavoritesResponse {
  page: number;
  total: number;
  totalPages: number;
  results: Movie[];
}
