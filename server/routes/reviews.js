import express from 'express';
import ReviewsController from '../controllers/reviews';
import authenticationMiddleware from '../middleware/authenticate';
import authModifyReviewMiddleware from '../middleware/authoriseModifyReview';


const router = express.Router();

const reviewsController = new ReviewsController();

// POST /api/v1/reviews/:recipeId - Add a review to specified recipe

router.route('/:recipeId')

  .post(authenticationMiddleware, reviewsController.addReviews);

// PUT /api/v1/reviews/:reviewId - Update a review

router.route('/:reviewId')

  .put(authenticationMiddleware, authModifyReviewMiddleware, reviewsController.updateReview);

// DELETE /api/v1/reviews/:reviewId - Delete a review

router.route('/:reviewId')

  .delete(authenticationMiddleware, authModifyReviewMiddleware, reviewsController.deleteReview);

// GET /api/v1/reviews/:recipeId - Get Recipe Reviews

router.route('/:recipeId')

  .get(reviewsController.getRecipeReviews);


export default router;
