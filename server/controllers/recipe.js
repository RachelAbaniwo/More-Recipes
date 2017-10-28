import recipes from '../models/recipe';

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
      } else {
        recipes.sort((recipe1, recipe2) => recipe1.upvotes > recipe2.upvotes);
      }
    }
    res.send(recipes);
  }
  /**
   * adds recipes to database
   * @param {object} req express request object
   * @param {object} res express response object
   * @returns {json} json returned to client
   */
  addRecipes(req, res) {
    const recipe = req.body;
    if (!req.body.recipeName) {
      res.status(422).send('recipe name field is empty, fill in name of recipe and check that other fields are filled.');
    }
    if (!req.body.recipeType) {
      res.status(422).send('recipe type field is empty, fill in type of recipe and check that other fields are filled.');
    }
    if (!req.body.ingredients) {
      res.status(422).send('lists of ingredients field is empty, fill in ingredients of recipe and check that other fields are filled.');
    }
    if (!req.body.description) {
      res.status(422).send('description of recipe field is empty, fill a description of recipe and check that other fields are filled.');
    }
    if (!req.body.direction) {
      res.status(422).send('direction for preparation of recipe was not found, fill in direction to prepare recipe and check that other fields are filled.');
    }
    recipe.id = recipes.length + 1;
    recipe.upvotes = 0;
    recipe.downvotes = 0;
    recipe.favorites = 0;
    recipes.push(recipe);
    res.json({ message: 'Recipe successfully added!', recipe });
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
    res.json({ message: 'Recipe successfully updated!', recipe });
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