import express from 'express';
import ReviewsController from '../controllers/reviews';
import authenticationMiddleware from '../middleware/authenticate';


const reviewsController = new ReviewsController();

const router = express.Router();

router.post('/recipes/:recipeId/review', authenticationMiddleware, reviewsController.addReviews);
