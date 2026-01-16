

import {
  AddFavoriteRequest,
  AddFavoriteResponse
} from "../../domain/dto/AddFavoriteDTO";

export interface IAddFavoriteUseCase {
  execute(request: AddFavoriteRequest): Promise<AddFavoriteResponse>;
}
