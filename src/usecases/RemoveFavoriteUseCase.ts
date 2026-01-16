import { injectable, inject } from "tsyringe";
import { IRemoveFavoriteUseCase } from "./interface/IRemoveFavoriteUseCase";
import { IFavoritesRepository } from "../domain/repositories/IFavoritesRepository";
import {
  RemoveFavoriteRequest,
  RemoveFavoriteResponse
} from "../domain/dto/RemoveFavoriteDTO";


@injectable()
export class RemoveFavoriteUseCase
  implements IRemoveFavoriteUseCase {

  constructor(
    @inject("IFavoritesRepository") 
    private readonly favoritesRepo: IFavoritesRepository
  ) {}

  async execute(
    request: RemoveFavoriteRequest
  ): Promise<RemoveFavoriteResponse> {
    const { userId, imdbId } = request;

    if (!userId) throw new Error("Missing userId");
    if (!imdbId) throw new Error("Missing imdbId");

    const favorites =
      await this.favoritesRepo.remove(userId, imdbId);

    return { favorites };
  }
}
