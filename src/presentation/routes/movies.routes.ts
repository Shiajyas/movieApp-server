import { Router } from "express";
import { container } from "tsyringe";
import { MovieController } from "../controllers/MoviesController";

const router = Router();

// Lazy resolve controller inside route handlers
router.get("/search", (req, res) => container.resolve(MovieController).search(req, res));
router.get("/favorites", (req, res) => container.resolve(MovieController).favorites(req, res));
router.post("/favorites", (req, res) => container.resolve(MovieController).add(req, res));
router.delete("/favorites/:id", (req, res) => container.resolve(MovieController).remove(req, res));
router.get("/latest", (req, res) => container.resolve(MovieController).latest(req, res));


export default router;
