import express from 'express';
import RecipesController from '../controllers/recipes';
import authenticationMiddleware from '../middleware/authenticate';
import authourisationMiddleware from '../middleware/authorise';


const router = express.Router();

const recipesController = new RecipesController();

// GET /api/v1/recipes - gets all recipes in database

router.route('/')

  .get(recipesController.getRecipes);


// GET /api/v1/recipes/:recipeId - gets a particular recipe with Id specified

router.route('/:recipeId')

  .get(recipesController.getOneRecipe);


// POST /api/v1/recipes - creates a new recipe

router.route('/')

  .post(authenticationMiddleware, recipesController.addRecipes);


// PUT api/v1/recipes/:recipeId - updates an existing recipe specified by Id

router.route('/:recipeId')

  .put(authenticationMiddleware, authourisationMiddleware, recipesController.updateRecipe);


// DELETE api/v1/recipes/:recipeId - deletes the recipe specified by Id

router.route('/:recipeId')

  .delete(authenticationMiddleware, authourisationMiddleware, recipesController.deleteRecipe);


export default router;
