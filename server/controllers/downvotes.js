import db from '../models';

/**
 * Controls the downvotes endpoints
 */
export default class DownvotesController {
/**
 * add Downvotes of recipes to database
 * @param {object} req express request object
 * @param {object} res express response object
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
