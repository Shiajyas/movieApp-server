import { Request, Response } from "express";
import { injectable, inject } from "tsyringe";

import { ISearchMoviesUseCase } from "../../usecases/interface/ISearchMoviesUseCase";
import { IGetFavoritesUseCase } from "../../usecases/interface/IGetFavoritesUseCase";
import { IAddFavoriteUseCase } from "../../usecases/interface/IAddFavoriteUseCase";
import { IRemoveFavoriteUseCase } from "../../usecases/interface/IRemoveFavoriteUseCase";
import { IGetLatestMoviesUseCase } from "../../usecases/interface/IGetLatestMoviesUseCase";

@injectable()
export class MovieController {
  constructor(
    @inject("ISearchMoviesUseCase")
    private readonly searchMovies: ISearchMoviesUseCase,

    @inject("IGetFavoritesUseCase")
    private readonly getFavorites: IGetFavoritesUseCase,

    @inject("IAddFavoriteUseCase")
    private readonly addFavorite: IAddFavoriteUseCase,

    @inject("IRemoveFavoriteUseCase")
    private readonly removeFavorite: IRemoveFavoriteUseCase,

    @inject("IGetLatestMoviesUseCase")
    private readonly getLatest: IGetLatestMoviesUseCase
  ) {}

  search = async (req: Request, res: Response) => {
    try {
      const response = await this.searchMovies.execute({
        searchText: String(req.query.q || "").trim(),
        page: Math.max(Number(req.query.page || 1), 1)
      });
      return res.json(response);
    } catch (e: unknown) {
      return res.status(400).json({ error: String(e) });
    }
  };

  favorites = async (req: Request, res: Response) => {
    try {
      const response = await this.getFavorites.execute({
        userId: String(req.query.userId || ""),
        page: Number(req.query.page || 1),
        limit: Number(req.query.limit || 10)
      });
      return res.json(response);
    } catch (e: unknown) {
      return res.status(400).json({ error: String(e) });
    }
  };

  add = async (req: Request, res: Response) => {
    try {
      const imdbId = String(req.body.id || req.body.imdbId || req.body.imdbID || req.params.id || "");
      const response = await this.addFavorite.execute({
        userId: String(req.query.userId || ""),
        imdbId,
        movie: req.body
      });
      return res.json(response);
    } catch (e: unknown) {
      return res.status(400).json({ error: String(e) });
    }
  };

  remove = async (req: Request, res: Response) => {
    try {
      const response = await this.removeFavorite.execute({
        userId: String(req.query.userId || ""),
        imdbId: req.params.id
      });
      return res.json(response);
    } catch (e: unknown) {
      return res.status(400).json({ error: String(e) });
    }
  };

  latest = async (req: Request, res: Response) => {
    try {
      const response = await this.getLatest.execute({
        count: Number(req.query.count || 10)
      });
      return res.json(response);
    } catch (e: unknown) {
      return res.status(500).json({ error: String(e) });
    }
  };
}
