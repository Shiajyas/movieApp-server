import { injectable, inject } from "tsyringe";
import { IFavoritesRepository } from "../domain/repositories/IFavoritesRepository";
import { IGetFavoritesUseCase } from "./interface/IGetFavoritesUseCase";
import {
  GetFavoritesRequest,
  GetFavoritesResponse
} from "../domain/dto/GetFavoritesDTO";

@injectable()
export class GetFavoritesUseCase implements IGetFavoritesUseCase {
  constructor(
    @inject("IFavoritesRepository")
    private readonly favoritesRepo: IFavoritesRepository
  ) {}

  async execute(
    request: GetFavoritesRequest
  ): Promise<GetFavoritesResponse> {
    const { userId, page, limit } = request;

    if (!userId) {
      throw new Error("Missing userId");
    }

    if (page <= 0 || limit <= 0) {
      throw new Error("Invalid pagination values");
    }

    const { list, total } =
      await this.favoritesRepo.getPaginated(userId, page, limit);

    return {
      page,
      total,
      totalPages: Math.ceil(total / limit),
      results: list,
    };
  }
}
