

import {
  GetFavoritesRequest,
  GetFavoritesResponse
} from "../../domain/dto/GetFavoritesDTO";


export interface IGetFavoritesUseCase {
  execute(request: GetFavoritesRequest): Promise<GetFavoritesResponse>;
}
