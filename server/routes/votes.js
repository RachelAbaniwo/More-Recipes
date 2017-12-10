import express from 'express';

import DownvotesController from '../controllers/downvotes';
import UpvotesController from '../controllers/upvotes';
import authenticationMiddleware from '../middleware/authenticate';
import canDownvoteMiddleware from '../middleware/canDownvote';
import canUpvoteMiddleware from '../middleware/canUpvote';

const router = express.Router();

const downvotesController = new DownvotesController();
const upvotesController = new UpvotesController();


// POST api/v1/recipes/:recipeId/upvote - add an upvote to a recipe

router.route('/:recipeId/upvote')

  .post(authenticationMiddleware, canUpvoteMiddleware, upvotesController.addUpvote);


// POST api/v1/recipes/:recipeId/downvote - add a downvote to a recipe

router.route('/:recipeId/downvote')

  .post(authenticationMiddleware, canDownvoteMiddleware, downvotesController.addDownvote);


export default router;
