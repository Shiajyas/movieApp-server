
import { Movie } from "../entities/Movie";

export interface SearchMoviesRequest {
  searchText: string;
  page: number;
}

export interface SearchMoviesResponse {
  page: number;
  totalPages: number;
  totalResults: number;
  results: Movie[];
}
