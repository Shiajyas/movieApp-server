

import { Movie } from "../../domain/entities/Movie";

export interface AddFavoriteRequest {
     imdbId: string;    
  userId: string;
  movie: Movie;
}

export interface AddFavoriteResponse {
  favorites: Movie[];
}
