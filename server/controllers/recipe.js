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
    db.Recipe.findAll().then((recipes) => {
      return apiResponse('success', 200, { recipes }, res);
    }).catch(error => apiResponse('fail', 500, { message: error.message }, res));
  }
  /**
   * adds recipes to database
   * @param {object} req express request object
   * @param {object} res express response object
   * @returns {json} json returned to client
   */
  addRecipes(req, res) {
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
    }).then((recipe) => {
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
      .then((Recipe) => {
        return apiResponse('success', 200, { Recipe, message: 'Successfully updated recipe' }, res);
      }).catch(error => apiResponse('fail', 500, { message: error.message }, res));
  }


  /**
   * deletes recipes from database
   * @param {object} req express request object
   * @param {object} res express response object
   * @returns {json} json returns message to client
   */
  deleteRecipe(req, res) {
    db.Recipe.findById(req.params.id).then((recipe) => {
      if (recipe) {
        recipe.destroy().then(() => {
          return apiResponse('success', 200, { message: 'Successfully deleted recipe' }, res);    
        });
      } else {
        return apiResponse('fail', 500, { message: 'Recipe to be deleted not found' }, res);
      }
    });
  }
  /**
   * adds reviews to recipes database
   * @param {object} req express request object
   * @param {object} res express response object
   * @returns {json} json with updated reviews returned to client
   */
  addReviews(req, res) {
    if (!req.body.review) {
      return apiResponse('fail', 422, {message: 'Review field empty'}, res);
    }
    db.Recipe.findById(req.params.id).then((recipe) => {
      if (recipe) {
        db.Review.create({
          review: req.body.review,
          recipeId: recipe.id,
          userId: req.AuthUser.id
        }).then((review) => {
          return apiResponse('success', 201, { recipe, review, message: 'Review successfully added!' }, res); })
      } else {
        return apiResponse('fail', 404, {message: 'Recipe to be reviewed not found'}, res);
      }
    });
  }
  /**
   * adds User's Favorite recipes to database
   * @param {object} req express request object
   * @param {object} res express response object
   * @returns {json} json returned to client
   */
  addFavorite(req, res) {
    if (!req.AuthUser) {
      return apiResponse('fail', 422, {message: 'Unauthenticated User'}, res);
    }
    db.Recipe.findById(req.params.recipeId).then((recipe) => {
      if (recipe) {
        db.Favorite.create({
          recipeId: recipe.id,
          userId: req.AuthUser.id
        }).then(() => {
          return apiResponse('success', 201, { recipe, message: 'Favorite recipe successfully added!' }, res); })
      } else {
        return apiResponse('fail', 404, { message: 'Recipe to be added not found' }, res);
      }
    });
  }
  /**
   * gets User's Favorite recipes from database
   * @param {object} req express request object
   * @param {object} res express response object
   * @returns {json} json returned to client
   */
  getFavorites(req, res) {
    if (!req.AuthUser) {
      return apiResponse('fail', 422, {message: 'Unauthenticated User'}, res); 
    }
    db.Favorite.findAll().then((recipes) =>{ return apiResponse('success', 200, { recipes }, res);
    }).catch(error => apiResponse('fail', 500, { message: error.message }, res));
  }
 /*  addUpvotes(req, res) {
    if (!req.AuthUser) {
      return apiResponse('fail', 422, {message: 'Unauthenticated User'}, res);
    }
    db.Recipe.findById(req.params.recipeId).then((recipe) => {
      if (recipe) {
        db.Upvote.create({
          upvotes: recipe.upvotes+1,
          downvotes: recipe.downvotes
        }).then(() => {
          return apiResponse('success', 201, { recipe, message:  'recipe upvoted successfully' }, res); })
      } else {
        return apiResponse('fail', 404, { message: 'Recipe to be upvoted not found' }, res);
      }
    });
  } */
}
