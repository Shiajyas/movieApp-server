import { Movie } from "../entities/Movie";

export interface IFavoritesRepository {
  getAll(userId: string): Promise<Movie[]>;

  getPaginated(
    userId: string,
    page: number,
    limit: number
  ): Promise<{ list: Movie[]; total: number }>;

  add(userId: string, movie: Movie): Promise<Movie[]>;

  remove(userId: string, imdbID: string): Promise<Movie[]>;
}
