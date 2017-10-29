import recipes from '../models/recipe';
import apiResponse from '../helpers';

/**
 * Controlls the recipes endpoints
 */
export default class RecipesController {
  /**
   * gets all recipes from database
   * @param {object} req express request object
   * @param {object} res express response object
   * @returns {json} json returned to client
   */
  getRecipes(req, res) {
    if (req.query.sort === 'upvotes') {
      if (req.query.order === 'des') {
        recipes.sort((recipe1, recipe2) => recipe1.upvotes < recipe2.upvotes);
      }
    }

    return apiResponse('success', 200, { recipes }, res);
  }
  /**
   * adds recipes to database
   * @param {object} req express request object
   * @param {object} res express response object
   * @returns {json} json returned to client
   */
  addRecipes(req, res) {
    const recipe = req.body;
    const errors = [];
    if (!req.body.recipeName) {
      errors.push('Recipe Name is required.');
    }
    if (!req.body.recipeType) {
      errors.push('Recipe Type is required.');
    }
    if (!req.body.ingredients) {
      errors.push('Recipe Ingredients are required.');
    }
    if (!req.body.description) {
      errors.push('Recipe Description is required.');
    }
    if (!req.body.direction) {
      errors.push('Recipe Directions are required.');
    }

    if (errors.length > 0) {
      return apiResponse('fail', 422, { errors }, res, 'Please fix the validation errors');
    }

    recipe.id = recipes.length + 1;
    recipe.upvotes = 0;
    recipe.downvotes = 0;
    recipe.favorites = 0;
    recipes.push(recipe);
    res.status(201).json({
      status: 'success',
      data: {
        recipe,
        message: 'recipe successfully added'
      }
    });
  }
  /**
   * updates recipes on database
   * @param {object} req express request object
   * @param {object} res express response object
   * @returns {json} json returned to client
   */
  updateRecipe(req, res) {
    const recipe = recipes.find((currentRecipe) => {
      return currentRecipe.id === parseInt(req.params.id, 10);
    });

    if (recipe === undefined) {
      res.status(404).send('the recipe was not found in the database');
    }

    recipe.recipeName = req.body.recipeName;
    recipe.recipeType = req.body.recipeType;
    recipe.ingredients = req.body.ingredients;
    recipe.description = req.body.description;
    recipe.direction = req.body.direction;
    const indexOfRecipe = recipes.findIndex((currentRecipe) => {
      return currentRecipe.id === parseInt(req.params.id, 10);
    });

    recipes.splice(indexOfRecipe, 1, recipe);
    res.status(201).json({
      status: 'success',
      data: {
        recipe,
        message: 'Recipe successfully updated'
      }
    });
  }
  /**
   * deletes recipes from database
   * @param {object} req express request object
   * @param {object} res express response object
   * @returns {json} json returns message to client
   */
  deleteRecipe(req, res) {
    const indexOfRecipe = recipes.findIndex((currentRecipe) => {
      return currentRecipe.id === parseInt(req.params.id, 10);
    });
    if (indexOfRecipe === -1) {
      res.status(404).send('the recipe to be deleted was not found in the database');
    }
    recipes.splice(indexOfRecipe, 1);
    res.json({ message: 'Recipe successfully deleted!', recipes });
  }
  /**
   * adds reviews to recipes database
   * @param {object} req express request object
   * @param {object} res express response object
   * @returns {json} json with updated reviews returned to client
   */
  addReviews(req, res) {
    const recipe = recipes.find((currentRecipe) => {
      return currentRecipe.id === parseInt(req.params.id, 10);
    });

    if (recipe === undefined) {
      res.status(404).send('the recipe you want to review was not found in the database');
    }
    recipe.reviews.push(req.body.reviews);

    res.json({ message: 'Review successfully added!', recipe });
  }
}