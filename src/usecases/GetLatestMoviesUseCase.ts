import { injectable, inject } from "tsyringe";
import { IGetLatestMoviesUseCase } from "./interface/IGetLatestMoviesUseCase";
import {
  GetLatestMoviesRequest,
  GetLatestMoviesResponse
} from "../../src/domain/dto/GetLatestMoviesDTO";
import { IMovieSearchGateway } from "../domain/gateWay/IMovieSearchGateway";

@injectable()
export class GetLatestMoviesUseCase implements IGetLatestMoviesUseCase {
  constructor(
    @inject("IMovieSearchGateway")
    private readonly movieSearchGateway: IMovieSearchGateway
  ) {}

  async execute(
    request: GetLatestMoviesRequest
  ): Promise<GetLatestMoviesResponse> {
    const { count } = request;

    if (count <= 0) {
      throw new Error("Count must be greater than zero");
    }

    const popularTitles = [
      "Avengers",
      "Avatar",
      "Spider-Man",
      "Star Wars",
    ];

    const movies = (
      await Promise.all(
        popularTitles.map(title =>
          this.movieSearchGateway.searchByTitle(title, 1)
        )
      )
    )
      .flat()
      .sort((a, b) => Number(b.year) - Number(a.year))
      .slice(0, count);

    return { results: movies };
  }
}
