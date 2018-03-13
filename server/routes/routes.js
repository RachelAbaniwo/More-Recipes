import express from 'express';
import recipes from './recipes';
import users from './users';
import reviews from './reviews';
import votes from './votes';
import favorites from './favorites';
import modifyUser from './modifyUser';

const router = express.Router();


router.use('/recipes', recipes);
router.use('/users', users);
router.use('/reviews', reviews);
router.use('/recipes/', votes);
router.use('/favorites', favorites);
router.use('/users', modifyUser);


export default router;
