

import { injectable } from "tsyringe";
import { IMovieSearchGateway } from "./IMovieSearchGateway";
import { Movie } from "../../domain/entities/Movie";
import { OmdbClient } from "../../infra/datasources/OmdbClient";

@injectable()
export class OmdbMovieSearchGateway implements IMovieSearchGateway {
  constructor(private readonly omdbClient: OmdbClient) {}

  async searchByTitle(title: string, page: number): Promise<Movie[]> {
    const response = await this.omdbClient.search(title, page);

    if (!response.Search) return [];

    return response.Search.map(movie => ({
      id: movie.imdbID,
      title: movie.Title,
      year: movie.Year,
      poster: movie.Poster,
      type: movie.Type,
    }));
  }

    async getMovieById(imdbId: string): Promise<Movie | null> {
    const response = await this.omdbClient.getById(imdbId);

    if (!response) return null;

    return {
      id: response.imdbID,
      title: response.Title,
      year: response.Year,
      poster: response.Poster,
      type: response.Type,
  
    };
    
}

}
