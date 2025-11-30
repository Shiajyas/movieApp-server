import { Router } from 'express';
import * as MoviesCtrl from '../../controllers/MoviesController';
const router = Router();

// Search movies (with pagination)
router.get('/search', MoviesCtrl.search);

// Favorites list (with pagination support)
router.get('/favorites', MoviesCtrl.getFavorites);

// Add / remove favorites
router.post('/favorites', MoviesCtrl.addFavorite);
router.delete('/favorites/:id', MoviesCtrl.removeFavorite);

export default router;
