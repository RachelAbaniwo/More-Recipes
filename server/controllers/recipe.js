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
    return db.Recipe.findAll({
      //  include: { model: db.User }
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
    }).then(recipe => apiResponse('success', 201, { recipe, message: 'Successfully created recipe' }, res))
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
      .then(recipe => apiResponse('success', 201, { recipe, message: 'Successfully updated recipe' }, res))
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
  async addFavorite(req, res) {
    const query = { where: { userId: req.AuthUser.id, recipeId: req.params.recipeId } };
    const favorite = await db.Favorite.findOne(query);

    if (favorite) {
      await favorite.destroy();
      return apiResponse('success', 200, { message: 'Successfully removed this recipe from Favorites' }, res);
    }

    await db.Favorite.create({
      userId: req.AuthUser.id,
      recipeId: req.params.recipeId
    });
    const recipe = req.FavoriteRecipe;

    //  const numberOfUpvotes = await db.Downvote.count({ where: { recipeId: req.params.id } });

    return apiResponse('success', 201, { recipe, message: 'Recipe successfully added to Favorites!' }, res);
  }
  /**
   * gets User's Favorite recipes from database
   * @param {object} req express request object
   * @param {object} res express response object
   * @returns {json} json returned to client
   */
  async getFavorites(req, res) {
    try {
      const query = { where: { userId: req.AuthUser.id } };
      const favorites = await db.Favorite.findAll(query);

      if (favorites.length < 1) {
        return apiResponse('fail', 404, { message: 'You have no Favorite Recipes' }, res);
      }
      const recipeIds = favorites.map(favorite => favorite.recipeId);
      const nextQuery = { where: { id: { [db.Sequelize.Op.in]: recipeIds } } };
      const recipes = await db.Recipe.findAll(nextQuery);
      return apiResponse('success', 200, { recipes }, res);
    } catch (error) {
      return apiResponse('fail', 500, { message: error.message }, res);
    }
  }
  /**
   * adds Upvotes of recipes to database
   * @param {object} req express request object
   * @param {object} res express response object
   * @returns {json} json returned to client
   */
  async addUpvote(req, res) {
    const query = { where: { userId: req.AuthUser.id, recipeId: req.params.recipeId } };
    const upvote = await db.Upvote.findOne(query);

    if (upvote) {
      await upvote.destroy();
      return apiResponse('success', 200, { message: 'Successfully removed Upvote from this recipe' }, res);
    }

    await db.Upvote.create({
      userId: req.AuthUser.id,
      recipeId: req.params.recipeId
    });

    //  const numberOfUpvotes = await db.Downvote.count({ where: { recipeId: req.params.id } });

    return apiResponse('success', 201, { message: 'Recipe Upvoted successfully' }, res);
  }
  /**
   * add Downvotes of recipes to database
   * @param {object} req express request object
   * @param {object} res express response object
   * @returns {json} json returned to client
   */
  async addDownvote(req, res) {
    const query = { where: { userId: req.AuthUser.id, recipeId: req.params.recipeId } };
    const downvote = await db.Downvote.findOne(query);

    if (downvote) {
      await downvote.destroy();
      return apiResponse('success', 200, { message: 'Successfully removed Downvote from this recipe' }, res);
    }

    await db.Downvote.create({
      userId: req.AuthUser.id,
      recipeId: req.params.recipeId
    });

    //  const numberOfUpvotes = await db.Downvote.count({ where: { recipeId: req.params.id } });

    return apiResponse('success', 201, { message: 'Recipe Downvoted successfully' }, res);
  }
}
