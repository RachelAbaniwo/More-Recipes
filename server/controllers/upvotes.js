import db from '../models';

/**
 * Controls the upvotes endpoints
 */
export default class UpvotesController {
  /**
   * adds Upvotes to recipes
   * @param {object} req request object
   * @param {object} res response object
   * @returns {json} json returned to client
   */
  async addUpvote(req, res) {
    const query = { where: { userId: req.AuthUser.id, recipeId: req.params.recipeId } };
    const upvote = await db.Upvote.findOne(query);

    if (upvote) {
      await upvote.destroy();
      return res.status(200).json({
        message: 'Successfully removed Upvote from this recipe'
      });
    }

    await db.Upvote.create({
      userId: req.AuthUser.id,
      recipeId: req.params.recipeId
    });

    return res.status(201).json({
      message: 'Recipe Upvoted successfully'
    });
  }
}
