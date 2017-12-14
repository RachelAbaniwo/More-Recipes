import express from 'express';
import recipeRoutes from './recipes';
import userRoutes from './users';
import reviewRoutes from './reviews';
import voteRoutes from './votes';
import favoriteRoutes from './favorites';
import modifyUserRoutes from './modifyUser';

const router = express.Router();


router.use('/recipes', recipeRoutes);
router.use('/users', userRoutes);
router.use('/reviews', reviewRoutes);
router.use('/recipes/', voteRoutes);
router.use('/favorites', favoriteRoutes);
router.use('/users', modifyUserRoutes);


export default router;
