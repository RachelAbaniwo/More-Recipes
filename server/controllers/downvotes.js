import db from '../models';

const { Recipe, Downvote } = db;


/**
 * Controls the Downvote endpoints
 * @class DownvotesController
 */
export default class DownvotesController {
/**
 *
 * Adds a downvote to a recipe or removes the vote if recipe is already upvoted or downvoted
 * @function addDownvote
 *
 * @param {object} request - Recipe to be voted
 * @param {object} response - success message indicating downvote added or removed
 *
 * @returns {json} - success message returned to user
 */
  async addDownvote(request, response) {
    const recipe = await Recipe.findById(request.params.recipeId);
    const query = { where: { userId: request.AuthUser.id, recipeId: request.params.recipeId } };
    const downvote = await Downvote.findOne(query);

    if (downvote) {
      await downvote.destroy();
      await recipe.decrement('downvotes');
      return response.status(200).json({
        recipe, message: 'Successfully removed downvote from this recipe'
      });
    }
    await Downvote.create({
      userId: request.AuthUser.id,
      recipeId: request.params.recipeId
    });
    await recipe.increment('downvotes');

    return response.status(201).json({
      recipe, message: 'Recipe downvoted successfully'
    });
  }
}
