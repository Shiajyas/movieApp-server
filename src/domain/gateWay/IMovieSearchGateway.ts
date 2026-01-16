

import { Movie } from "../../domain/entities/Movie";

export interface IMovieSearchGateway {
  searchByTitle(title: string, page: number): Promise<Movie[]>;
  getMovieById(imdbId: string): Promise<Movie | null>;
}
