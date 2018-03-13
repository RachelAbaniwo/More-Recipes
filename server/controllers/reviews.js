import db from '../models';
import { checkField, returnParameter } from '../helpers/checkInput';

const { Recipe, Review, User } = db;

/**
 * Controls the reviews endpoints
 * @class ReviewsController
 */
export default class ReviewsController {
/**
   * adds reviews to recipes
   * @function addReviews
   *
   * @param {object} request review object to be added to the recipe
   * @param {object} response added review object
   *
   * @returns {json} returns recipe and review object
   */
  addReviews(request, response) {
    if ((!request.body.review) || (checkField(request.body.review))) {
      return response.status(400).json({
        message: 'Review field empty'
      });
    }
    Recipe.findById(request.params.recipeId).then((recipe) => {
      if (recipe) {
        Review.create({
          review: request.body.review,
          recipeId: recipe.id,
          userId: request.AuthUser.id
        }).then(review => Review.findById(review.id, {
          include: [{ model: User, exclude: 'password' }]
        }).then(reviewWithUser => response.status(201).json({
          recipe,
          review: reviewWithUser,
          message: 'Review successfully added!'
        })));
      } else {
        return response.status(404).json({
          message: 'Recipe to be reviewed not found'
        });
      }
    }).catch(() => response.status(400).json({
      message: 'Invalid request'
    }));
  }
  /**
   * gets recipe reviews
   * @function getRecipeReviews
   *
   * @param {object} request contains recipe id
   * @param {object} response array of recipe reviews
   *
   * @returns {json} returns recipe and array of reviews or error message
   */
  getRecipeReviews(request, response) {
    Recipe.findOne({ where: { id: request.params.recipeId }, }).then((recipe) => {
      if (!recipe) {
        return response.status(404).json({
          message: 'Recipe not found'
        });
      }
      Review.findAll({
        where: { recipeId: request.params.recipeId },
        include: [{ all: true, attributes: { exclude: ['password'] }, nested: true }]
      }).then((reviews) => {
        if (reviews.length < 1) {
          return response.status(404).json({
            message: 'Recipe has no reviews'
          });
        }
        response.status(200).json({
          recipe,
          reviews
        });
      }).catch(() =>
        response.status(400).json({
          message: 'Invalid request'
        }));
    }).catch(() =>
      response.status(400).json({
        message: 'Invalid request'
      }));
  }
  /**
   * edits reviews
   * @function updateReview
   *
   * @param {object} request - review object to be updated
   * @param {object} response - updated review object
   *
   * @returns {json} - returns updated review and success or error message
   */
  updateReview(request, response) {
    Review.findById(request.params.reviewId).then((review) => {
      Review.update({
        review: returnParameter(request.body.review) || review.review,
        id: review.id
      }, {
        where: { id: request.params.reviewId },
        returning: true,
        plain: true
      })
        .then((newReview) => {
          const updatedReview = {
            review: newReview[1].review,
            id: newReview[1].id,
            userId: newReview[1].userId
          };
          response.status(201).json({
            review: updatedReview, message: 'Successfully updated your review'
          });
        }).catch(error => response.status(500).json({
          message: error.message
        }));
    }).catch(() => response.status(400).json({ message: 'Invalid request' }));
  }

  /**
   * deletes reviews
   * @function deleteReview
   *
   * @param {object} request review object to be deleted
   * @param {object} response message
   *
   * @returns {json} returns success or error message
   */
  deleteReview(request, response) {
    Review.findById(request.params.reviewId).then((review) => {
      review.destroy().then(() => response.status(200).json({
        message: 'Successfully deleted your review'
      }))
        .catch(error => response.status(500).json({
          message: error.message
        }));
    });
  }
}
