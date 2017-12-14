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
  /**
   * edit reviews
   * @param {object} req request object
   * @param {object} res response object
   * @returns {json} json with updated reviews returned to client
   */
  getRecipeReviews(req, res) {
    db.Recipe.findOne({ where: { id: req.params.recipeId } }).then((recipe) => {
      if (!recipe) {
        return res.status(404).json({
          message: 'Recipe not Found'
        });
      }
      db.Review.findAll({ where: { recipeId: req.params.recipeId } }).then((reviews) => {
        if (reviews.length < 1) {
          return res.status(404).json({
            message: 'Recipe has no Reviews'
          });
        }
        res.status(200).json({
          recipe,
          reviews
        });
      }).catch(() =>
        res.status(400).json({
          message: 'Invalid Request'
        }));
    }).catch(() =>
      res.status(400).json({
        message: 'Invalid Request'
      }));
  }
  /**
   * edit reviews
   * @param {object} req request object
   * @param {object} res response object
   * @returns {json} json with updated reviews returned to client
   */
  updateReview(req, res) {
    db.Review.findById(req.params.reviewId).then((review) => {
      db.Review.update({
        review: req.body.review || review.review,
        id: review.id
      }, {
        where: { id: req.params.reviewId },
        returning: true,
        plain: true
      })
        .then((newReview) => {
          const updatedReview = {
            review: newReview[1].review,
            id: newReview[1].id,
            userId: newReview[1].userId
          };
          res.status(201).json({
            updatedReview, message: 'Successfully updated your review'
          });
        }).catch(error => res.status(500).json({
          message: error.message
        }));
    }).catch(() => res.status(400).json({ message: 'Invalid Request' }));
  }

  /**
   * deletes reviews
   * @param {object} req request object
   * @param {object} res response object
   * @returns {json} json with updated reviews returned to client
   */
  deleteReview(req, res) {
    db.Review.findById(req.params.reviewId).then((review) => {
      review.destroy().then(() => res.status(200).json({
        message: 'Successfully deleted your review'
      }))
        .catch(error => res.status(500).json({
          message: error.message
        }));
    });
  }
}
