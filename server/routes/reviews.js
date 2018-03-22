import express from 'express';
import Reviews from '../controllers/reviews';
import authenticate from '../middleware/authenticate';


const router = express.Router();

const reviewsController = new Reviews();

// POST /api/v1/recipes/:recipeId/reviews - Add a review to specified recipe

router.route('/:recipeId/reviews')

  .post(authenticate, reviewsController.addReviews);

// GET /api/v1/recipes/:recipeId/reviews - Get Recipe Reviews

router.route('/:recipeId/reviews')

  .get(reviewsController.getRecipeReviews);


export default router;
