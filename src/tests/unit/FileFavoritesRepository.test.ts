import "reflect-metadata";

import { FileFavoritesRepository } from "../../repositories/FileFavoritesRepository";
import fs from "fs/promises";

jest.mock("fs/promises");

describe("FileFavoritesRepository - Unit", () => {
  let repo: FileFavoritesRepository;

  beforeEach(() => {
    repo = new FileFavoritesRepository();
    (fs.readFile as jest.Mock).mockResolvedValue("{}");
    (fs.writeFile as jest.Mock).mockResolvedValue(undefined);
  });

  
  test("should add movie to favorites", async () => {
    const movie = { id: "m1", title: "Batman" };
    const result = await repo.add("user1", movie);

    expect(result).toEqual([movie]);
    expect(fs.writeFile).toHaveBeenCalled();
  });

  test("should not duplicate a movie", async () => {
    const movie = { id: "m2", title: "Superman" };
    (fs.readFile as jest.Mock).mockResolvedValue(
      JSON.stringify({ user1: [movie] })
    );

    const result = await repo.add("user1", movie);
    expect(result.length).toBe(1);
  });

  test("should remove movie from favorites", async () => {
    const movie = { id: "m3", title: "Spiderman" };
    (fs.readFile as jest.Mock).mockResolvedValue(
      JSON.stringify({ user1: [movie] })
    );

    const result = await repo.remove("user1", "m3");
    expect(result).toEqual([]);
  });
});
