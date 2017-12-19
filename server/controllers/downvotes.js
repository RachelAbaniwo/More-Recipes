import db from '../models';

const { Downvote } = db;


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
    const query = { where: { userId: req.AuthUser.id, recipeId: req.params.recipeId } };
    const downvote = await Downvote.findOne(query);

    if (downvote) {
      await downvote.destroy();
      return res.status(200).json({
        message: 'Successfully removed Downvote from this recipe'
      });
    }

    await Downvote.create({
      userId: req.AuthUser.id,
      recipeId: req.params.recipeId
    });


    return res.status(201).json({
      message: 'Recipe Downvoted successfully'
    });
  }
}
