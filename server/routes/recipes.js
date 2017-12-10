import express from 'express';
import RecipesController from '../controllers/recipes';
import authenticationMiddleware from '../middleware/authenticate';
import authourisationMiddleware from '../middleware/authorise';


const router = express.Router();

const recipesController = new RecipesController();

router.get('/recipes', recipesController.getRecipes);

router.get('/recipes/:recipeId', recipesController.getOneRecipe);
router.post('/recipes', authenticationMiddleware, recipesController.addRecipes);
router.put('/recipes/:recipeId', authenticationMiddleware, authourisationMiddleware, recipesController.updateRecipe);
router.delete('/recipes/:recipeId', authenticationMiddleware, authourisationMiddleware, recipesController.deleteRecipe);

