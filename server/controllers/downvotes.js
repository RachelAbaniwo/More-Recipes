import db from '../models';


/**
 * Controls the downvote endpoints
 */
export default class DownvotesController {
/**
 * add a Downvote to a recipe and removes the vote if recipe is already Upvoted or Downvoted
 * @param {object} req request object
 * @param {object} res response object
 * @returns {json} json returned to client
 */
  async addDownvote(req, res) {
    const query = { where: { userId: req.AuthUser.id, recipeId: req.params.recipeId } };
    const downvote = await db.Downvote.findOne(query);

    if (downvote) {
      await downvote.destroy();
      return res.status(200).json({
        message: 'Successfully removed Downvote from this recipe'
      });
    }

    await db.Downvote.create({
      userId: req.AuthUser.id,
      recipeId: req.params.recipeId
    });


    return res.status(201).json({
      message: 'Recipe Downvoted successfully'
    });
  }
}
