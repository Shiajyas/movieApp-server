

import { Movie } from "../../domain/entities/Movie";

export interface GetLatestMoviesRequest {
  count: number;
}

export interface GetLatestMoviesResponse {
  results: Movie[];
}
