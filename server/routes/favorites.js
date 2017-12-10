import express from 'express';
import FavoritesController from '../controllers/favorites';
import canFavoriteMiddleware from '../middleware/canFavorite';
import authenticationMiddleware from '../middleware/authenticate';


const favoritesController = new FavoritesController();
const router = express.Router();



router.post('/users/favorite/:recipeId', authenticationMiddleware, canFavoriteMiddleware, favoritesController.addFavorite);
router.get('/users/favorites', authenticationMiddleware, favoritesController.getFavorites);