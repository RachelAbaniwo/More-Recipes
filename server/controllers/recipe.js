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
    db.Recipe.findAll({
      include: { model: db.User }
    }).then(recipes => apiResponse('success', 200, { recipes }, res))
      .catch(error => apiResponse('fail', 500, { message: error.message }, res));
  }
  /**
   * gets a recipe from database
   * @param {object} req express request object
   * @param {object} res express response object
   * @returns {json} json returned to client
   */
  getOneRecipe(req, res) {
    db.Recipe.findById(req.params.id).then((recipe) => {
      if (!recipe) {
        return apiResponse('fail', 404, { message: 'Recipe not found' }, res);
      }
      return apiResponse('success', 200, { recipe }, res);
    }).catch(() => apiResponse('fail', 422, { message: 'Invalid Request' }, res));
  }
  /**
   * gets a user's personal recipes from database
   * @param {object} req express request object
   * @param {object} res express response object
   * @returns {json} json returned to client
   */
  getMyRecipes(req, res) {
    db.Recipe.findAll({ where: { userId: req.AuthUser.id } }).then((recipes) => {
      if (recipes.length < 1) {
        return apiResponse('fail', 404, { message: 'You have no Recipes' }, res);
      } apiResponse('success', 200, { recipes }, res);
    }).catch(error =>
      apiResponse('fail', 500, { message: error.message }, res));
  }
  /**
   * gets any user's recipes from database
   * @param {object} req express request object
   * @param {object} res express response object
   * @returns {json} json returned to client
   */
  getUserRecipes(req, res) {
    db.Recipe.findAll({ where: { userId: req.params.id } }).then((recipes) => {
      if (recipes.length < 1) {
        return apiResponse('fail', 404, { message: 'User has no Recipes' }, res);
      } apiResponse('success', 200, { recipes }, res);
    }).catch(() =>
      apiResponse('fail', 422, { message: 'Invalid Request' }, res));
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
      errors.push('Recipe Category is required.');
    }
    if (!req.body.ingredients) {
      errors.push('Recipe Ingredients are required.');
    }
    if (!req.body.description) {
      errors.push('Recipe Description is required.');
    }
    if (!req.body.method) {
      errors.push('Method required.');
    }

    if (errors.length > 0) {
      return apiResponse('fail', 422, { errors, message: 'Please fill all Fields' }, res);
    }
    return db.Recipe.create({
      name: req.body.name,
      category: req.body.category,
      description: req.body.description,
      method: req.body.method,
      ingredients: req.body.ingredients,
      userId: req.AuthUser.id
    }).then(recipe => apiResponse('success', 200, { recipe, message: 'Successfully created recipe' }, res))
      .catch(error => apiResponse('fail', 500, { message: error.message }, res));
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
      .then(Recipe => apiResponse('success', 200, { Recipe, message: 'Successfully updated recipe' }, res))
      .catch(error => apiResponse('fail', 500, { message: error.message }, res));
  }
  /**
   * deletes recipes from database
   * @param {object} req express request object
   * @param {object} res express response object
   * @returns {json} json returns message to client
   */
  deleteRecipe(req, res) {
    return db.Recipe.findById(req.params.id).then((recipe) => {
      recipe.destroy().then(() => apiResponse('success', 200, { message: 'Successfully deleted recipe' }, res))
        .catch(error => apiResponse('fail', 500, { message: error.message }, res));
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
      return apiResponse('fail', 422, { message: 'Review field empty' }, res);
    }
    db.Recipe.findById(req.params.id).then((recipe) => {
      if (recipe) {
        db.Review.create({
          review: req.body.review,
          recipeId: recipe.id,
          userId: req.AuthUser.id
        }).then(review => apiResponse('success', 201, { recipe, review, message: 'Review successfully added!' }, res));
      } else {
        return apiResponse('fail', 404, { message: 'Recipe to be reviewed not found' }, res);
      }
    }).catch(() => apiResponse('fail', 422, { message: 'Invalid Request' }, res));
  }
  /**
   * adds User's Favorite recipes to database
   * @param {object} req express request object
   * @param {object} res express response object
   * @returns {json} json returned to client
   */
  addFavorite(req, res) {
    db.Recipe.findById(req.params.recipeId).then((recipe) => {
      if (recipe) {
        db.Favorite.findOne({ where: { userId: req.AuthUser.id, recipeId: req.params.recipeId } })
          .then((favoritedAlready) => {
            if (favoritedAlready) {
              return favoritedAlready.destroy().then(() => apiResponse('success', 200, { message: 'Successfully removed Recipe from Favorites' }, res))
                .catch(error => apiResponse('fail', 500, { message: error.message }, res));
            }
            db.Favorite.create({
              recipeId: recipe.id,
              userId: req.AuthUser.id
            }).then(() => apiResponse('success', 201, { recipe, message: 'Favorite recipe successfully added!' }, res));
          });
      } else {
        return apiResponse('fail', 404, { message: 'Recipe to be added not found' }, res);
      }
    }).catch(() => apiResponse('fail', 422, { message: 'Invalid Request' }, res));
  }
  /**
   * gets User's Favorite recipes from database
   * @param {object} req express request object
   * @param {object} res express response object
   * @returns {json} json returned to client
   */
  getFavorites(req, res) {
    return db.Favorite.findAll({ where: { userId: req.AuthUser.id } }).then((favorites) => {
      if (favorites.length < 1) {
        return apiResponse('fail', 404, { message: 'You have no Favorite Recipes' }, res);
      }
      const recipeIds = favorites.map(favorite => favorite.recipeId);
      return db.Recipe.findAll({
        where: {
          id: {
            [db.Sequelize.Op.in]: recipeIds
          }
        }
      }).then(recipes => apiResponse('success', 200, { recipes }, res));
    }).catch(error => apiResponse('fail', 500, { message: error.message }, res));
  }
  /**
   * adds Upvotes of recipes to database
   * @param {object} req express request object
   * @param {object} res express response object
   * @returns {json} json returned to client
   */
  addUpvotes(req, res) {
    db.Recipe.findById(req.params.recipeId).then((recipe) => {
      if (recipe) {
        db.Upvote.findOne({ where: { userId: req.AuthUser.id, recipeId: req.params.recipeId } })
          .then((upvotedAlready) => {
            if (upvotedAlready) {
              return upvotedAlready.destroy().then(() => apiResponse('success', 200, { message: 'Successfully removed Upvote from this recipe' }, res))
                .catch(error => apiResponse('fail', 500, { message: error.message }, res));
            }
            db.Upvote.create({
              userId: req.AuthUser.id,
              recipeId: req.params.recipeId
            }).then(upvotes => apiResponse('success', 201, { recipe, upvotes, message: 'recipe upvoted successfully' }, res));
          });
      } else {
        return apiResponse('fail', 404, { message: 'Recipe to be upvoted not found' }, res);
      }
    });
  }
  /**
   * add Downvotes of recipes to database
   * @param {object} req express request object
   * @param {object} res express response object
   * @returns {json} json returned to client
   */
  addDownvotes(req, res) {
    db.Recipe.findById(req.params.recipeId).then((recipe) => {
      if (recipe) {
        db.Downvote.findOne({ where: { userId: req.AuthUser.id, recipeId: req.params.recipeId } })
          .then((downvotedAlready) => {
            if (downvotedAlready) {
              return downvotedAlready.destroy().then(() => apiResponse('success', 200, { message: 'Successfully removed Downvote from this recipe' }, res))
                .catch(error => apiResponse('fail', 500, { message: error.message }, res));
            }
            db.Downvote.create({
              userId: req.AuthUser.id,
              recipeId: req.params.recipeId
            }).then(downvotes => apiResponse('success', 201, { recipe, downvotes, message: 'recipe downvoted successfully' }, res));
          });
      } else {
        return apiResponse('fail', 404, { message: 'Recipe to be downvoted not found' }, res);
      }
    });
  }
}
