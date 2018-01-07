import db from '../models';
import { checkField, returnParameter } from '../helpers/checkInput';

const { Recipe, Review } = db;

/**
 * Controls the reviews endpoints
 */
export default class ReviewsController {
/**
   * adds reviews to recipes
   * @param {object} req review object to be added to the recipe
   * @param {object} res added review object
   * @returns {json} returns recipe and review object
   */
  addReviews(req, res) {
    if ((!req.body.review) || (checkField(req.body.review))) {
      return res.status(400).json({
        message: 'Review field empty'
      });
    }
    Recipe.findById(req.params.recipeId).then((recipe) => {
      if (recipe) {
        Review.create({
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
   * gets recipe reviews
   * @param {object} req recipe id request
   * @param {object} res array of recipe reviews
   * @returns {json} returns recipe and array of reviews
   */
  getRecipeReviews(req, res) {
    Recipe.findOne({ where: { id: req.params.recipeId }, }).then((recipe) => {
      if (!recipe) {
        return res.status(404).json({
          message: 'Recipe not Found'
        });
      }
      Review.findAll({
        where: { recipeId: req.params.recipeId },
        include: [{ all: true, attributes: { exclude: ['Password'] }, nested: true }]
      }).then((reviews) => {
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
   * edits reviews
   * @param {object} req - review object to be updated
   * @param {object} res - updated review object
   * @returns {json} - returns updated review
   */
  updateReview(req, res) {
    Review.findById(req.params.reviewId).then((review) => {
      Review.update({
        review: returnParameter(req.body.review) || review.review,
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
   * @param {object} req review object to be deleted
   * @param {object} res message
   * @returns {json} returns message
   */
  deleteReview(req, res) {
    Review.findById(req.params.reviewId).then((review) => {
      review.destroy().then(() => res.status(200).json({
        message: 'Successfully deleted your review'
      }))
        .catch(error => res.status(500).json({
          message: error.message
        }));
    });
  }
}
