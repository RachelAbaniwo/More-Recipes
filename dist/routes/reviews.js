'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _reviews = require('../controllers/reviews');

var _reviews2 = _interopRequireDefault(_reviews);

var _authenticate = require('../middleware/authenticate');

var _authenticate2 = _interopRequireDefault(_authenticate);

var _authoriseModifyReview = require('../middleware/authoriseModifyReview');

var _authoriseModifyReview2 = _interopRequireDefault(_authoriseModifyReview);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

var reviewsController = new _reviews2.default();

// POST /api/v1/reviews/:recipeId - Add a review to specified recipe

router.route('/:recipeId').post(_authenticate2.default, reviewsController.addReviews);

// PUT /api/v1/reviews/:reviewId - Update a review

router.route('/:reviewId').put(_authenticate2.default, _authoriseModifyReview2.default, reviewsController.updateReview);

// DELETE /api/v1/reviews/:reviewId - Delete a review

router.route('/:reviewId').delete(_authenticate2.default, _authoriseModifyReview2.default, reviewsController.deleteReview);

// GET /api/v1/reviews/:recipeId - Get Recipe Reviews

router.route('/:recipeId').get(reviewsController.getRecipeReviews);

exports.default = router;