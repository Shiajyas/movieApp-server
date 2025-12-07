import "reflect-metadata";

import { injectable } from 'tsyringe';
import * as fs from 'fs/promises';
import path from 'path';
import { IFavoritesRepository } from './IFavoritesRepository';

const file = path.join(__dirname, '..', '..', 'storage', 'favorites.json');

@injectable()
export class FileFavoritesRepository implements IFavoritesRepository {
  
  /** Read favorites.json and return full object { userId: [movies...] } */
  private async read(): Promise<Record<string, any[]>> {
    try {
      await fs.mkdir(path.dirname(file), { recursive: true });

      const raw = await fs.readFile(file, 'utf8').catch(() => '{}');
      return JSON.parse(raw || '{}');
    } catch {
      await this.write({});
      return {};
    }
  }

  /** Write entire object to favorites.json */
  private async write(data: Record<string, any[]>) {
    await fs.mkdir(path.dirname(file), { recursive: true });
    await fs.writeFile(file, JSON.stringify(data, null, 2), 'utf8');
  }

  /** Return all favorites for user */
  async getAll(userId: string) {
    const data = await this.read();
    return data[userId] || [];
  }

  /** Return paginated favorites */
  async getPaginated(userId: string, page: number, limit: number) {
    const list = await this.getAll(userId);
    const total = list.length;
    const skip = (page - 1) * limit;
    return {
      list: list.slice(skip, skip + limit),
      total
    };
  }

  /** Add movie if not already added */
  async add(userId: string, movie: any) {
    const data = await this.read();
    data[userId] = data[userId] || [];

    // prevent duplicates
    if (!data[userId].some(m => m.id === movie.id)) {
      data[userId].push(movie);
    }

    await this.write(data);
    return data[userId];
  }

  /** Remove movie by imdb id */
  async remove(userId: string, imdbID: string) {
    const data = await this.read();
    data[userId] = (data[userId] || []).filter(m => m.id !== imdbID);
    await this.write(data);
    return data[userId];
  }
}
