import "reflect-metadata";
import { addFavorite, getFavorites, removeFavorite } from "../../presentation/controllers/MoviesController";
import { container } from "tsyringe";
import { IFavoritesRepository } from "../../domain/repositories/IFavoritesRepository";


const mockRepo: jest.Mocked<IFavoritesRepository> = {
  getPaginated: jest.fn(),
  add: jest.fn(),
  remove: jest.fn(),
  getAll: jest.fn(),
};

beforeAll(() => {
  container.registerInstance("IFavoritesRepository", mockRepo);
});

const mockRes: any = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

describe("MoviesController - Integration", () => {

  test("addFavorite should return updated favorites", async () => {
    mockRepo.add.mockResolvedValue([{ id: "m1" }]);

    const req: any = { query: { userId: "u1" }, body: { id: "m1" } };
    await addFavorite(req, mockRes);

    expect(mockRepo.add).toHaveBeenCalledWith("u1", { id: "m1" });
    expect(mockRes.json).toHaveBeenCalledWith([{ id: "m1" }]);
  });

  test("getFavorites should paginate correctly", async () => {
    mockRepo.getPaginated.mockResolvedValue({
      list: [{ id: "m2" }],
      total: 1
    });

    const req: any = { query: { userId: "u1", page: 1, limit: 10 } };
    await getFavorites(req, mockRes);

    expect(mockRes.json).toHaveBeenCalledWith({
      page: 1,
      total: 1,
      totalPages: 1,
      results: [{ id: "m2" }],
    });
  });

  test("removeFavorite should remove movie", async () => {
    mockRepo.remove.mockResolvedValue([]);

    const req: any = { query: { userId: "u1" }, params: { id: "m1" } };
    await removeFavorite(req, mockRes);

    expect(mockRepo.remove).toHaveBeenCalledWith("u1", "m1");
    expect(mockRes.json).toHaveBeenCalledWith([]);
  });
});
