    import request from "supertest";
    import app from "../../infra/http/app";
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

    describe("API - Favorites", () => {
    test("POST /api/movies/favorites should add movie", async () => {
        mockRepo.add.mockResolvedValue([{ id: "m1" }]);

        const res = await request(app)
        .post("/api/movies/favorites?userId=u1")
        .send({ id: "m1" });

        expect(res.status).toBe(200);
        expect(res.body).toEqual([{ id: "m1" }]);
    });

    test("GET /api/movies/favorites should return list", async () => {
        mockRepo.getPaginated.mockResolvedValue({ list: [{ id: "m2" }], total: 1 });

        const res = await request(app)
        .get("/api/movies/favorites?userId=u1&page=1&limit=10");

        expect(res.status).toBe(200);
        expect(res.body.results).toEqual([{ id: "m2" }]);
    });

    test("DELETE /api/movies/favorites/:id should remove movie", async () => {
        mockRepo.remove.mockResolvedValue([]);

        const res = await request(app)
        .delete("/api/movies/favorites/m1?userId=u1");

        expect(res.status).toBe(200);
        expect(res.body).toEqual([]);
    });
    });
