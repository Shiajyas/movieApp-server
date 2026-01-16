import {
  RemoveFavoriteRequest,
  RemoveFavoriteResponse
} from "../../domain/dto/RemoveFavoriteDTO";

export interface IRemoveFavoriteUseCase {
  execute(request: RemoveFavoriteRequest): Promise<RemoveFavoriteResponse>;
}
