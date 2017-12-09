import express from 'express';
import RecipesController from '../controllers/recipe';
import UserController from '../controllers/user';
import authenticationMiddleware from '../middleware/authenticate';
import authourisationMiddleware from '../middleware/authorise';
import canDownvoteMiddleware from '../middleware/canDownvote';
import canUpvoteMiddleware from '../middleware/canUpvote';
import canFavoriteMiddleware from '../middleware/canFavorite';


const router = express.Router();

const recipesController = new RecipesController();
const userController = new UserController();

router.get('/recipes', recipesController.getRecipes);
router.get('/recipes/:recipeId', recipesController.getOneRecipe);
router.get('/users/myrecipes', authenticationMiddleware, recipesController.getMyRecipes);
router.get('/users/:userId/recipes', authenticationMiddleware, recipesController.getUserRecipes);
router.post('/recipes', authenticationMiddleware, recipesController.addRecipes);
router.put('/recipes/:recipeId', authenticationMiddleware, authourisationMiddleware, recipesController.updateRecipe);
router.delete('/recipes/:recipeId', authenticationMiddleware, authourisationMiddleware, recipesController.deleteRecipe);
router.post('/recipes/:recipeId/review', authenticationMiddleware, recipesController.addReviews);
router.post('/signup', userController.userSignUp);
router.post('/signin', userController.userSignIn);
router.post('/users/favorite/:recipeId', authenticationMiddleware, canFavoriteMiddleware, recipesController.addFavorite);
router.get('/users/favorites', authenticationMiddleware, recipesController.getFavorites);
router.post('/recipes/:recipeId/upvote', authenticationMiddleware, canUpvoteMiddleware, recipesController.addUpvote);
router.post('/recipes/:recipeId/downvote', authenticationMiddleware, canDownvoteMiddleware, recipesController.addDownvote);

export default router;
