import express from 'express';
import RecipesController from '../controllers/recipe';
import UserController from '../controllers/user';
import authenticationMiddleware from '../middleware/auth';
import authourisationMiddleware from '../middleware/authorise';
import canDownvoteMiddleWare from '../middleware/canDownvote';
import canUpvoteMiddleWare from '../middleware/canUpvote';
import canFavoriteMiddleWare from '../middleware/canFavorite';


const router = express.Router();

const recipesController = new RecipesController();
const userController = new UserController();

router.get('/recipes', recipesController.getRecipes);
router.get('/recipes/:id', recipesController.getOneRecipe);
router.get('/users/myrecipes', authenticationMiddleware, recipesController.getMyRecipes);
router.get('/users/:id/recipes', authenticationMiddleware, recipesController.getUserRecipes);
router.post('/recipes', authenticationMiddleware, recipesController.addRecipes);
router.put('/recipes/:id', authenticationMiddleware, authourisationMiddleware, recipesController.updateRecipe);
router.delete('/recipes/:id', authenticationMiddleware, authourisationMiddleware, recipesController.deleteRecipe);
router.post('/recipes/:id/review', authenticationMiddleware, recipesController.addReviews);
router.post('/signup', userController.userSignUp);
router.post('/signin', userController.userSignIn);
router.post('/users/favorite/:recipeId', authenticationMiddleware, canFavoriteMiddleWare, recipesController.addFavorite);
router.get('/users/favorites', authenticationMiddleware, recipesController.getFavorites);
router.post('/recipes/:recipeId/upvote', authenticationMiddleware, canUpvoteMiddleWare, recipesController.addUpvote);
router.post('/recipes/:recipeId/downvote', authenticationMiddleware, canDownvoteMiddleWare, recipesController.addDownvote);

export default router;
