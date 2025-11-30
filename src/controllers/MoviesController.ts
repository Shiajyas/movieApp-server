import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { OmdbClient } from '../datasources/OmdbClient';
import { IFavoritesRepository } from '../repositories/IFavoritesRepository';

// Search movies with OMDB API (pagination included)
export const search = async (req: Request, res: Response) => {
  try {
    const q = String(req.query.q || '').trim();
    const page = Math.max(Number(req.query.page || 1), 1);

    if (!q) return res.status(400).json({ error: 'Missing query param q' });

    const client = container.resolve(OmdbClient);
    const omdbData = await client.search(q, page);

    if (!omdbData.Search) {
      return res.json({
        page,
        totalPages: 0,
        totalResults: 0,
        results: [],
      });
    }

    const totalResults = Number(omdbData.totalResults || 0);
    const totalPages = Math.ceil(totalResults / 10); // OMDB returns 10 results per page

    return res.json({
      page,
      totalPages,
      totalResults,
      results: omdbData.Search.map((movie: any) => ({
        id: movie.imdbID,
        title: movie.Title,
        year: movie.Year,
        poster: movie.Poster,
        type: movie.Type,
      })),
    });

  } catch (err: any) {
    return res.status(500).json({ error: err?.message || 'Internal server error' });
  }
};

export const getFavorites = async (req: Request, res: Response) => {
  try {
    const userId = String(req.query.userId || '');
    if (!userId) return res.status(400).json({ error: "Missing userId" });

    const page = Math.max(Number(req.query.page || 1), 1);
    const limit = Math.max(Number(req.query.limit || 10), 1);

    const repo = container.resolve<IFavoritesRepository>('IFavoritesRepository' as any);
    const { list, total } = await repo.getPaginated(userId, page, limit);

    return res.json({
      page,
      total,
      totalPages: Math.ceil(total / limit),
      results: list,
    });
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const addFavorite = async (req: Request, res: Response) => {
  try {
    const userId = String(req.query.userId || '');
    if (!userId) return res.status(400).json({ error: "Missing userId" });


    const movie = req.body;
    if (!movie?.id) return res.status(400).json({ error: "Movie payload missing id" });

    const repo = container.resolve<IFavoritesRepository>('IFavoritesRepository' as any);
    const updated = await repo.add(userId, movie);


    return res.json(updated);
  } catch {
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const removeFavorite = async (req: Request, res: Response) => {
  try {
    const userId = String(req.query.userId || '');
    if (!userId) return res.status(400).json({ error: "Missing userId" });
    console.log("reached");
    
    const imdbID = req.params.id;
    const repo = container.resolve<IFavoritesRepository>('IFavoritesRepository' as any);
    const updated = await repo.remove(userId, imdbID);

    return res.json(updated);
  } catch {
    return res.status(500).json({ error: "Internal server error" });
  }
};
