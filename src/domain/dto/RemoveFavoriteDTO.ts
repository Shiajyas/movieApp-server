

import { Movie } from "../../domain/entities/Movie";

export interface RemoveFavoriteRequest {
    imdbId: string;
  userId: string;

}

export interface RemoveFavoriteResponse {
  favorites: Movie[];
}
