import { injectable } from 'tsyringe';
import * as fs from 'fs/promises';
import path from 'path';
import { IFavoritesRepository } from './IFavoritesRepository';

const file = path.join(__dirname, '..', '..', 'storage', 'favorites.json');

@injectable()
export class FileFavoritesRepository implements IFavoritesRepository {

  private async read(): Promise<Record<string, any[]>> {
    try {
      await fs.mkdir(path.dirname(file), { recursive: true });
      return JSON.parse(await fs.readFile(file, 'utf8') || '{}');
    } catch {
      await this.write({});
      return {};
    }
  }

  private async write(data: Record<string, any[]>) {
    await fs.mkdir(path.dirname(file), { recursive: true });   // <-- FIX
    await fs.writeFile(file, JSON.stringify(data, null, 2), 'utf8');
  }

  async getAll(userId: string) {
    const data = await this.read();
    return data[userId] || [];
  }

  async getPaginated(userId: string, page: number, limit: number) {
    const list = await this.getAll(userId);
    const total = list.length;
    const skip = (page - 1) * limit;
    return { list: list.slice(skip, skip + limit), total };
  }

  async add(userId: string, movie: any) {

    // console.log(userId,">>>");
    // console.log(movie,">>>");

    const data = await this.read();
    data[userId] = data[userId] || [];
    if (!data[userId].some(m => m.id === movie.id)) {
      data[userId].push(movie);
    }
    await this.write(data);
    // console.log(data[userId],">>>");
    
    return data[userId];
  }

  async remove(userId: string, imdbID: string) {
    const data = await this.read();
    console.log(data,">>>");
    
    data[userId] = (data[userId] || []).filter(m => m.id !== imdbID);
    await this.write(data);
    return data[userId];
  }
}
