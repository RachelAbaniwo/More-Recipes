import db from '../models';

const { Recipe, Upvote } = db;

/**
 * Controls the upvote endpoints
 * @class UpvotesController
 */
export default class UpvotesController {
  /**
 * Adds an upvote to a recipe or removes the vote
 * if recipe is already upvoted or downvoted
 *
 * @param {object} request - Recipe to be voted
 * @param {object} response - success message indicating upvote added or removed
 *
 * @returns {json} - success message returned to user
 */
  async addUpvote(request, response) {
    const recipe = await Recipe.findById(request.params.recipeId);
    const query = { where: { userId: request.AuthUser.id, recipeId: request.params.recipeId } };
    const upvote = await Upvote.findOne(query);

    if (upvote) {
      await upvote.destroy();
      await recipe.decrement('upvotes');
      return response.status(200).json({
        recipe, message: 'Successfully removed upvote from this recipe'
      });
    }
    await Upvote.create({
      userId: request.AuthUser.id,
      recipeId: request.params.recipeId
    });
    await recipe.increment('upvotes');

    return response.status(201).json({
      recipe, message: 'Recipe upvoted successfully'
    });
  }
}
