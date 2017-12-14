import express from 'express';
import FavoritesController from '../controllers/favorites';
import canFavoriteMiddleware from '../middleware/canFavorite';
import authenticationMiddleware from '../middleware/authenticate';
import authDeleteFavoriteMiddleware from '../middleware/deleteFavorite';


const router = express.Router();

const favoritesController = new FavoritesController();

// GET /api/v1/favorites - Gets signed in user favorites

router.route('/')

  .get(authenticationMiddleware, favoritesController.getFavorites);


// POST /api/v1/favorites/:recipeId

router.route('/:recipeId')

  .post(authenticationMiddleware, canFavoriteMiddleware, favoritesController.addFavorite);

// DELETE /api/v1/favorites/:favoriteId

router.route('/:favoriteId')

  .delete(
    authenticationMiddleware, authDeleteFavoriteMiddleware,
    favoritesController.deleteFavorite
  );


export default router;
