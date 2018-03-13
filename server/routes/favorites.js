import express from 'express';
import Favorites from '../controllers/favorites';
import canFavorite from '../middleware/canFavorite';
import authenticate from '../middleware/authenticate';
import deleteFavorite from '../middleware/deleteFavorite';


const router = express.Router();

const favoritesController = new Favorites();

// GET /api/v1/favorites - Gets signed in user favorites

router.route('/')

  .get(authenticate, favoritesController.getFavorites);


// POST /api/v1/favorites/:recipeId

router.route('/:recipeId')

  .post(authenticate, canFavorite, favoritesController.addFavorite);

// DELETE /api/v1/favorites/:favoriteId

router.route('/:favoriteId')

  .delete(
    authenticate, deleteFavorite,
    favoritesController.deleteFavorite
  );


export default router;
