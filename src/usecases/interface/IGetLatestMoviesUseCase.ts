import {
  GetLatestMoviesRequest,
  GetLatestMoviesResponse
} from "../../domain/dto/GetLatestMoviesDTO";
export interface IGetLatestMoviesUseCase {
  execute(request: GetLatestMoviesRequest): Promise<GetLatestMoviesResponse>;
}
