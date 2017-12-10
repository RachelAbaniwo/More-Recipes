import express from 'express';
import RecipesController from '../controllers/recipes';
import UserController from '../controllers/users';
import DownvotesController from '../controllers/downvotes';
import UpvotesController from '../controllers/upvotes';
import FavoritesController from '../controllers/favorites';
import ReviewsController from '../controllers/reviews';

import authenticationMiddleware from '../middleware/authenticate';
import authourisationMiddleware from '../middleware/authorise';
import canDownvoteMiddleware from '../middleware/canDownvote';
import canUpvoteMiddleware from '../middleware/canUpvote';
import canFavoriteMiddleware from '../middleware/canFavorite';


const router = express.Router();

const recipesController = new RecipesController();
const userController = new UserController();
const downvotesController = new DownvotesController();
const upvotesController = new UpvotesController();
const favoritesController = new FavoritesController();
const reviewsController = new ReviewsController();


router.get('/recipes', recipesController.getRecipes);
router.get('/recipes/:recipeId', recipesController.getOneRecipe);
router.get('/users/myrecipes', authenticationMiddleware, recipesController.getMyRecipes);
router.get('/users/:userId/recipes', authenticationMiddleware, recipesController.getUserRecipes);
router.post('/recipes', authenticationMiddleware, recipesController.addRecipes);
router.put('/recipes/:recipeId', authenticationMiddleware, authourisationMiddleware, recipesController.updateRecipe);
router.delete('/recipes/:recipeId', authenticationMiddleware, authourisationMiddleware, recipesController.deleteRecipe);
router.post('/recipes/:recipeId/review', authenticationMiddleware, reviewsController.addReviews);
router.post('/users/signup', userController.userSignUp);
router.post('/users/signin', userController.userSignIn);
router.post('/users/favorite/:recipeId', authenticationMiddleware, canFavoriteMiddleware, favoritesController.addFavorite);
router.get('/users/favorites', authenticationMiddleware, favoritesController.getFavorites);
router.post('/recipes/:recipeId/upvote', authenticationMiddleware, canUpvoteMiddleware, upvotesController.addUpvote);
router.post('/recipes/:recipeId/downvote', authenticationMiddleware, canDownvoteMiddleware, downvotesController.addDownvote);

export default router;
