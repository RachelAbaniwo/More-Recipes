import db from '../models';

/**
 * Controls the reviews endpoints
 */
export default class ReviewsController {
/**
   * adds reviews to recipes database
   * @param {object} req request object
   * @param {object} res response object
   * @returns {json} json with updated reviews returned to client
   */
  addReviews(req, res) {
    if (!req.body.review) {
      return res.status(400).json({
        message: 'Review field empty'
      });
    }
    db.Recipe.findById(req.params.recipeId).then((recipe) => {
      if (recipe) {
        db.Review.create({
          review: req.body.review,
          recipeId: recipe.id,
          userId: req.AuthUser.id
        }).then(review => res.status(201).json({
          recipe,
          review,
          message: 'Review successfully added!'
        }));
      } else {
        return res.status(404).json({
          message: 'Recipe to be reviewed not found'
        });
      }
    }).catch(() => res.status(400).json({
      message: 'Invalid Request'
    }));
  }
}
