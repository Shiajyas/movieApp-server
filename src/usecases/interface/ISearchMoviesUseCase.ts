import {
  SearchMoviesRequest,
  SearchMoviesResponse,
} from "../../domain/dto/SearchMoviesDTO";

export interface ISearchMoviesUseCase {
  execute(request: SearchMoviesRequest): Promise<SearchMoviesResponse>;
}
