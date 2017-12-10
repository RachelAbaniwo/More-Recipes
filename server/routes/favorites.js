import express from 'express';
import FavoritesController from '../controllers/favorites';
import canFavoriteMiddleware from '../middleware/canFavorite';
import authenticationMiddleware from '../middleware/authenticate';


const router = express.Router();

const favoritesController = new FavoritesController();

// GET /api/v1/users/favorites - Gets signed in user favorites

router.route('/')

  .get(authenticationMiddleware, favoritesController.getFavorites);


// POST /api/v1/users/favorites/:recipeId

router.route('/:recipeId')

  .post(authenticationMiddleware, canFavoriteMiddleware, favoritesController.addFavorite);


export default router;
