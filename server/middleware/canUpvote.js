import db from '../database/models/index';
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

    const query = { where: { userId: req.AuthUser.id, recipeId: req.params.recipeId } };

    const downvote = await db.Downvote.findOne(query);

    if (downvote) {
      await downvote.destroy();
    }

    //  req.currentRecipe = recipe;
    next();
  } catch (error) {
    return apiResponse('fail', 422, { message: 'Invalid Request.' }, res);
  }
};