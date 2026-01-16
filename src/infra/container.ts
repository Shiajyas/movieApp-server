import 'reflect-metadata'


import { container } from "tsyringe";

import { IFavoritesRepository } from "../domain/repositories/IFavoritesRepository";
import { FileFavoritesRepository } from "../domain/repositories/FileFavoritesRepository";

import { ISearchMoviesUseCase } from "../usecases/interface/ISearchMoviesUseCase";
import { IGetFavoritesUseCase } from "../usecases/interface/IGetFavoritesUseCase";
import { IAddFavoriteUseCase } from "../usecases/interface/IAddFavoriteUseCase";
import { IRemoveFavoriteUseCase } from "../usecases/interface/IRemoveFavoriteUseCase";
import { IGetLatestMoviesUseCase } from "../usecases/interface/IGetLatestMoviesUseCase";
import { IMovieSearchGateway } from "../domain/gateWay/IMovieSearchGateway";

import { SearchMoviesUseCase } from "../usecases/SearchMoviesUseCase";
import { GetFavoritesUseCase } from "../usecases/GetFavoritesUseCase";
import { AddFavoriteUseCase } from "../usecases/AddFavoriteUseCase";
import { RemoveFavoriteUseCase } from "../usecases/RemoveFavoriteUseCase";
import { GetLatestMoviesUseCase } from "../usecases/GetLatestMoviesUseCase";
import { OmdbMovieSearchGateway } from '../domain/gateWay/OmdbMovieSearchGateway';


// repositories
container.registerSingleton<IFavoritesRepository>(
  "IFavoritesRepository",
  FileFavoritesRepository
);

// use cases
container.registerSingleton<ISearchMoviesUseCase>(
  "ISearchMoviesUseCase",
  SearchMoviesUseCase
);

container.registerSingleton<IGetFavoritesUseCase>(
  "IGetFavoritesUseCase",
  GetFavoritesUseCase
);

container.registerSingleton<IAddFavoriteUseCase>(
  "IAddFavoriteUseCase",
  AddFavoriteUseCase
);

container.registerSingleton<IRemoveFavoriteUseCase>(
  "IRemoveFavoriteUseCase",
  RemoveFavoriteUseCase
);

container.registerSingleton<IGetLatestMoviesUseCase>(
  "IGetLatestMoviesUseCase",
  GetLatestMoviesUseCase
);

// infra
container.registerSingleton<IMovieSearchGateway>(
  "IMovieSearchGateway",
  OmdbMovieSearchGateway
);

