import express from 'express';

import Downvotes from '../controllers/downvotes';
import Upvotes from '../controllers/upvotes';
import authenticate from '../middleware/authenticate';
import canDownvote from '../middleware/canDownvote';
import canUpvote from '../middleware/canUpvote';

const router = express.Router();

const downvotesController = new Downvotes();
const upvotesController = new Upvotes();


// POST api/v1/recipes/:recipeId/upvote - add an upvote to a recipe

router.route('/:recipeId/upvote')

  .post(authenticate, canUpvote, upvotesController.addUpvote);


// POST api/v1/recipes/:recipeId/downvote - add a downvote to a recipe

router.route('/:recipeId/downvote')

  .post(authenticate, canDownvote, downvotesController.addDownvote);


export default router;
