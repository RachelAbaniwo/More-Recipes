import db from '../models/index';
import apiResponse from '../helpers';

export default async (req, res, next) => {
  try {
    const recipe = await db.Recipe.findById(req.params.recipeId);

    if (!recipe) {
      return apiResponse('fail', 404, { message: 'Recipe not found.' }, res);
    }

    if (recipe.userId === req.AuthUser.id) {
      return apiResponse('fail', 401, { message: 'Unauthorized.' }, res);
    }
    req.FavoriteRecipe = recipe;
    next();
  } catch (error) {
    return apiResponse('fail', 422, { message: 'Invalid Request.' }, res);
  }
};
