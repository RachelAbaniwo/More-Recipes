import express from 'express';

import DownvotesController from '../controllers/downvotes';
import UpvotesController from '../controllers/upvotes';
import authenticationMiddleware from '../middleware/authenticate';
import canDownvoteMiddleware from '../middleware/canDownvote';
import canUpvoteMiddleware from '../middleware/canUpvote';

const downvotesController = new DownvotesController();
const upvotesController = new UpvotesController();

const router = express.Router();


router.post('/recipes/:recipeId/upvote', authenticationMiddleware, canUpvoteMiddleware, upvotesController.addUpvote);
router.post('/recipes/:recipeId/downvote', authenticationMiddleware, canDownvoteMiddleware, downvotesController.addDownvote);
