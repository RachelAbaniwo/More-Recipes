import db from '../models';

const { Recipe, Downvote } = db;


/**
 * Controls the Downvote endpoints
 */
export default class DownvotesController {
/**
 * Adds a Downvote to a recipe or Removes the vote if recipe is already Upvoted or Downvoted
 * @param {object} req - Recipe to be voted
 * @param {object} res - success message indicating downvote added or removed
 * @returns {json} - success message returned to User
 */
  async addDownvote(req, res) {
    const recipe = await Recipe.findById(req.params.recipeId);
    const query = { where: { userId: req.AuthUser.id, recipeId: req.params.recipeId } };
    const downvote = await Downvote.findOne(query);

    if (downvote) {
      await downvote.destroy();
      await recipe.decrement('downvotes');
      return res.status(200).json({
        recipe, message: 'Successfully removed downvote from this recipe'
      });
    }
    await Downvote.create({
      userId: req.AuthUser.id,
      recipeId: req.params.recipeId
    });
    await recipe.increment('downvotes');

    return res.status(201).json({
      recipe, message: 'Recipe downvoted successfully'
    });
  }
}
