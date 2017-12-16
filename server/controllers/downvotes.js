import db from '../models';

const { Downvote } = db;


/**
 * Controls the downvote endpoints
 */
export default class DownvotesController {
/**
 * adds a Downvote to a recipe and removes the vote if recipe is already Upvoted or Downvoted
 * @param {object} req request object
 * @param {object} res response object
 * @returns {json} json returned to client
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