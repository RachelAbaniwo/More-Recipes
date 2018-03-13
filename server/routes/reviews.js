import express from 'express';
import Reviews from '../controllers/reviews';
import authenticate from '../middleware/authenticate';
import authoriseModifyReview from '../middleware/authoriseModifyReview';


const router = express.Router();

const reviewsController = new Reviews();

// POST /api/v1/reviews/:recipeId - Add a review to specified recipe

router.route('/:recipeId')

  .post(authenticate, reviewsController.addReviews);

// PUT /api/v1/reviews/:reviewId - Update a review

router.route('/:reviewId')

  .put(authenticate, authoriseModifyReview, reviewsController.updateReview);

// DELETE /api/v1/reviews/:reviewId - Delete a review

router.route('/:reviewId')

  .delete(authenticate, authoriseModifyReview, reviewsController.deleteReview);

// GET /api/v1/reviews/:recipeId - Get Recipe Reviews

router.route('/:recipeId')

  .get(reviewsController.getRecipeReviews);


export default router;
