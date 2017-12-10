import express from 'express';
import ReviewsController from '../controllers/reviews';
import authenticationMiddleware from '../middleware/authenticate';


const router = express.Router();

const reviewsController = new ReviewsController();

// POST /api/v1/recipes/reviews/:recipeId - Add a review to specified recipe

router.route('/:recipeId')

  .post(authenticationMiddleware, reviewsController.addReviews);


export default router;
