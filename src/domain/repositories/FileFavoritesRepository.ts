import "reflect-metadata";
import { injectable } from "tsyringe";
import * as fs from "fs/promises";
import path from "path";
import { IFavoritesRepository } from "./IFavoritesRepository";
import { Movie } from "../entities/Movie";

const file = path.join(process.cwd(), "storage", "favorites.json");

@injectable()
export class FileFavoritesRepository implements IFavoritesRepository {

  private async read(): Promise<Record<string, Movie[]>> {
    try {
      await fs.mkdir(path.dirname(file), { recursive: true });
      const raw = await fs.readFile(file, "utf8").catch(() => "{}");
      return JSON.parse(raw || "{}");
    } catch {
      await this.write({});
      return {};
    }
  }

  private async write(data: Record<string, Movie[]>) {
    await fs.mkdir(path.dirname(file), { recursive: true });
    await fs.writeFile(file, JSON.stringify(data, null, 2), "utf8");
  }

  async getAll(userId: string): Promise<Movie[]> {
    const data = await this.read();
    return data[userId] || [];
  }

  async getPaginated(
    userId: string,
    page: number,
    limit: number
  ): Promise<{ list: Movie[]; total: number }> {
    const list = await this.getAll(userId);
    const total = list.length;
    const start = (page - 1) * limit;

    return {
      list: list.slice(start, start + limit),
      total,
    };
  }

  async add(userId: string, movie: Movie): Promise<Movie[]> {
    const data = await this.read();
    data[userId] = data[userId] || [];

    if (!data[userId].some(m => m.id === movie.id)) {
      data[userId].push(movie);
    }

    await this.write(data);
    return data[userId];
  }

  async remove(userId: string, imdbID: string): Promise<Movie[]> {
    const data = await this.read();
    data[userId] = (data[userId] || []).filter(m => m.id !== imdbID);
    await this.write(data);
    return data[userId];
  }
}
