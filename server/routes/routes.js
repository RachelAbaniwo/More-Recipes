import express from 'express';
import recipeRoutes from './recipes';
import userRoutes from './users';
import reviewRoutes from './reviews';
import voteRoutes from './votes';
import favoriteRoutes from './favorites';

const router = express.Router();


router.use('/recipes', recipeRoutes);
router.use('/users', userRoutes);
router.use('/recipes/reviews', reviewRoutes);
router.use('/recipes/', voteRoutes);
router.use('/users/favorites', favoriteRoutes);

export default router;
