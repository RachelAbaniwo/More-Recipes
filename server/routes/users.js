import express from 'express';
import UserController from '../controllers/users';
import RecipesController from '../controllers/recipes';
import authenticationMiddleware from '../middleware/authenticate';

const userController = new UserController();
const recipesController = new RecipesController();

const router = express.Router();

router.get('/users/myrecipes', authenticationMiddleware, recipesController.getMyRecipes);
router.get('/users/:userId/recipes', authenticationMiddleware, recipesController.getUserRecipes);

router.post('/users/signup', userController.userSignUp);
router.post('/users/signin', userController.userSignIn);
