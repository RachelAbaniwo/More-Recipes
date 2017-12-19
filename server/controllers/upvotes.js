import db from '../models';

const { Upvote } = db;

/**
 * Controls the upvote endpoints
 */
export default class UpvotesController {
  /**
 * Adds an Upvote to a recipe or Removes the vote if recipe is already Upvoted or Downvoted
 * @param {object} req - Recipe to be voted
 * @param {object} res - success message indicating upvote added or removed
 * @returns {json} - success message returned to User
 */
  async addUpvote(req, res) {
    const query = { where: { userId: req.AuthUser.id, recipeId: req.params.recipeId } };
    const upvote = await Upvote.findOne(query);

    if (upvote) {
      await upvote.destroy();
      return res.status(200).json({
        message: 'Successfully removed Upvote from this recipe'
      });
    }

    await Upvote.create({
      userId: req.AuthUser.id,
      recipeId: req.params.recipeId
    });

    return res.status(201).json({
      message: 'Recipe Upvoted successfully'
    });
  }
}
