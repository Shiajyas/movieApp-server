import { injectable, inject } from "tsyringe";
import { IFavoritesRepository } from "../domain/repositories/IFavoritesRepository";
import { IAddFavoriteUseCase } from "./interface/IAddFavoriteUseCase";
import {
  AddFavoriteRequest,
  AddFavoriteResponse
} from "../domain/dto/AddFavoriteDTO";

@injectable()
export class AddFavoriteUseCase implements IAddFavoriteUseCase {
  constructor(
    @inject("IFavoritesRepository")
    private readonly favoritesRepo: IFavoritesRepository
  ) {}

  async execute(
    request: AddFavoriteRequest
  ): Promise<AddFavoriteResponse> {
    const { userId, imdbId, movie } = request;

    if (!userId) {
      throw new Error("Missing userId");
    }

    if (!imdbId) {
      throw new Error("Missing imdbId");
    }

    if (!movie || movie.id !== imdbId) {
      throw new Error("Movie data is invalid");
    }

    const favorites =
      await this.favoritesRepo.add(userId, movie);

    return { favorites };
  }
}
