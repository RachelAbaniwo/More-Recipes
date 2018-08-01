import express from 'express';
import Recipes from '../controllers/recipes';
import authenticate from '../middleware/authenticate';
import authorise from '../middleware/authorise';


const router = express.Router();

const recipesController = new Recipes();

// GET /api/v1/recipes - gets all recipes in database

router.route('/')

  .get(recipesController.getRecipes);


// GET /api/v1/recipes/:recipeId - gets a particular recipe with Id specified

router.route('/:recipeId')

  .get(recipesController.getOneRecipe);


// POST /api/v1/recipes - creates a new recipe

router.route('/')

  .post(authenticate, recipesController.addRecipes);


// PUT api/v1/recipes/:recipeId - updates an existing recipe specified by Id

router.route('/:recipeId')

  .put(authenticate, authorise, recipesController.updateRecipe);


// DELETE api/v1/recipes/:recipeId - deletes the recipe specified by Id

router.route('/:recipeId')

  .delete(authenticate, authorise, recipesController.deleteRecipe);


export default router;
