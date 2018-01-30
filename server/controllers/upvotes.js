import db from '../models';

const { Recipe, Upvote } = db;

/**
 * Controls the upvote endpoints
 */
export default class UpvotesController {
  /**
 * Adds an Upvote to a recipe or Removes the vote if recipe is already Upvoted or Downvoted
 *
 * @param {object} req - Recipe to be voted
 * @param {object} res - success message indicating upvote added or removed
 * 
 * @returns {json} - success message returned to User
 */
  async addUpvote(req, res) {
    const recipe = await Recipe.findById(req.params.recipeId);
    const query = { where: { userId: req.AuthUser.id, recipeId: req.params.recipeId } };
    const upvote = await Upvote.findOne(query);

    if (upvote) {
      await upvote.destroy();
      await recipe.decrement('upvotes');
      return res.status(200).json({
        recipe, message: 'Successfully removed upvote from this recipe'
      });
    }
    await Upvote.create({
      userId: req.AuthUser.id,
      recipeId: req.params.recipeId
    });
    await recipe.increment('upvotes');

    return res.status(201).json({
      recipe, message: 'Recipe upvoted successfully'
    });
  }
}
