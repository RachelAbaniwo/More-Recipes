import db from '../database/models';
import apiResponse from '../helpers';

/**
 * Controls the recipes endpoints
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

    if (!req.body.name) {
      errors.push('Recipe Name is required.');
    }
    if (!req.body.category) {
      errors.push('Recipe Type is required.');
    }
    if (!req.body.ingredients) {
      errors.push('Recipe Ingredients are required.');
    }
    if (!req.body.description) {
      errors.push('Recipe Description is required.');
    }
    if (!req.body.method) {
      errors.push('Recipe Directions are required.');
    }

    if (errors.length > 0) {
      return apiResponse('fail', 422, { errors, message: 'Please fix the validation errors' }, res);
    }
    console.log(req.AuthUser);
    return db.Recipe.create({
      name: req.body.name,
      category: req.body.category,
      description: req.body.description,
      method: req.body.method,
      ingredients: req.body.ingredients,
      userId: req.AuthUser.id
    }).then(recipe => {
      return apiResponse('success', 200, { recipe, message: 'Successfully created recipe' }, res);
    }).catch(error => apiResponse('fail', 500, { message: error.message }, res));
  }
  /**
   * updates recipes on database
   * @param {object} req express request object
   * @param {object} res express response object
   * @returns {json} json returned to client
   */
  updateRecipe(req, res) {
    
    
    return db.Recipe.update({
      name: req.body.name,
      category: req.body.category,
      description: req.body.description,
      method: req.body.method,
      ingredients: req.body.ingredients,
    }, {
      where: { id: req.params.id },
      returning: true,
      plain: true
    })
  
  .then(Recipe => {
      return apiResponse('success', 200, { recipe, message: 'Successfully updated recipe' }, res);
    }).catch(error => apiResponse('fail', 500, { message: error.message }, res));
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
      return apiResponse('fail', 404, { message: 'the recipe to be deleted was not found in the database' }, res);
    }
    recipes.splice(indexOfRecipe, 1);
    return apiResponse('success', 200, { message: 'Recipe successfully deleted.' }, res);
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
      return apiResponse('fail', 404, { message: 'the recipe you want to review was not found in the database!' }, res);
    }
    recipe.reviews.push(req.body.reviews);
    return apiResponse('success', 201, { recipe, message: 'Review successfully added!' }, res);
  }
}