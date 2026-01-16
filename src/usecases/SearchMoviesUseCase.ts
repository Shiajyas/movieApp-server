import { injectable } from "tsyringe";
import { OmdbClient } from "../infra/datasources/OmdbClient";
import { ISearchMoviesUseCase } from "./interface/ISearchMoviesUseCase";
import { SearchMoviesRequest, SearchMoviesResponse } from "../domain/dto/SearchMoviesDTO";
import { OmdbMovieDTO } from "../domain/dto/OmdbMovieDTO";


@injectable()
export class SearchMoviesUseCase implements ISearchMoviesUseCase {
  constructor(private readonly omdbClient: OmdbClient) {}

  async execute(
    request: SearchMoviesRequest
  ): Promise<SearchMoviesResponse> {

    const { searchText, page } = request;

    if (!searchText) {
      throw new Error("Search text is required");
    }

    const data = await this.omdbClient.search(searchText, page);

    const results = (data.Search ?? []).map((movie: OmdbMovieDTO) => ({
      id: movie.imdbID,
      title: movie.Title,
      year: movie.Year,
      poster: movie.Poster,
      type: movie.Type,
    }));

    const totalResults = Number(data.totalResults ?? 0);
    const totalPages = Math.ceil(totalResults / 10);

    return {
      page,
      totalPages,
      totalResults,
      results,
    };
  }
}
