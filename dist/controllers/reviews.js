'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

var _checkInput = require('../helpers/checkInput');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Recipe = _models2.default.Recipe,
    Review = _models2.default.Review,
    User = _models2.default.User;

/**
 * Controls the reviews endpoints
 */

var ReviewsController = function () {
  function ReviewsController() {
    _classCallCheck(this, ReviewsController);
  }

  _createClass(ReviewsController, [{
    key: 'addReviews',

    /**
       * adds reviews to recipes
       * @param {object} req review object to be added to the recipe
       * @param {object} res added review object
       * @returns {json} returns recipe and review object
       */
    value: function addReviews(req, res) {
      if (!req.body.review || (0, _checkInput.checkField)(req.body.review)) {
        return res.status(400).json({
          message: 'Review field empty'
        });
      }
      Recipe.findById(req.params.recipeId).then(function (recipe) {
        if (recipe) {
          Review.create({
            review: req.body.review,
            recipeId: recipe.id,
            userId: req.AuthUser.id
          }).then(function (review) {
            return Review.findById(review.id, {
              include: [{ model: User, exclude: 'password' }]
            }).then(function (reviewWithUser) {
              return res.status(201).json({
                recipe: recipe,
                review: reviewWithUser,
                message: 'Review successfully added!'
              });
            });
          });
        } else {
          return res.status(404).json({
            message: 'Recipe to be reviewed not found'
          });
        }
      }).catch(function () {
        return res.status(400).json({
          message: 'Invalid request'
        });
      });
    }
    /**
     * gets recipe reviews
     * @param {object} req recipe id request
     * @param {object} res array of recipe reviews
     * @returns {json} returns recipe and array of reviews
     */

  }, {
    key: 'getRecipeReviews',
    value: function getRecipeReviews(req, res) {
      Recipe.findOne({ where: { id: req.params.recipeId } }).then(function (recipe) {
        if (!recipe) {
          return res.status(404).json({
            message: 'Recipe not found'
          });
        }
        Review.findAll({
          where: { recipeId: req.params.recipeId },
          include: [{ all: true, attributes: { exclude: ['password'] }, nested: true }]
        }).then(function (reviews) {
          if (reviews.length < 1) {
            return res.status(404).json({
              message: 'Recipe has no reviews'
            });
          }
          res.status(200).json({
            recipe: recipe,
            reviews: reviews
          });
        }).catch(function () {
          return res.status(400).json({
            message: 'Invalid request'
          });
        });
      }).catch(function () {
        return res.status(400).json({
          message: 'Invalid request'
        });
      });
    }
    /**
     * edits reviews
     * @param {object} req - review object to be updated
     * @param {object} res - updated review object
     * @returns {json} - returns updated review
     */

  }, {
    key: 'updateReview',
    value: function updateReview(req, res) {
      Review.findById(req.params.reviewId).then(function (review) {
        Review.update({
          review: (0, _checkInput.returnParameter)(req.body.review) || review.review,
          id: review.id
        }, {
          where: { id: req.params.reviewId },
          returning: true,
          plain: true
        }).then(function (newReview) {
          var updatedReview = {
            review: newReview[1].review,
            id: newReview[1].id,
            userId: newReview[1].userId
          };
          res.status(201).json({
            review: updatedReview, message: 'Successfully updated your review'
          });
        }).catch(function (error) {
          return res.status(500).json({
            message: error.message
          });
        });
      }).catch(function () {
        return res.status(400).json({ message: 'Invalid request' });
      });
    }

    /**
     * deletes reviews
     * @param {object} req review object to be deleted
     * @param {object} res message
     * @returns {json} returns message
     */

  }, {
    key: 'deleteReview',
    value: function deleteReview(req, res) {
      Review.findById(req.params.reviewId).then(function (review) {
        review.destroy().then(function () {
          return res.status(200).json({
            message: 'Successfully deleted your review'
          });
        }).catch(function (error) {
          return res.status(500).json({
            message: error.message
          });
        });
      });
    }
  }]);

  return ReviewsController;
}();

exports.default = ReviewsController;