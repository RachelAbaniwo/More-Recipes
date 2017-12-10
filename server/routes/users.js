import express from 'express';
import UserController from '../controllers/users';
import RecipesController from '../controllers/recipes';
import authenticationMiddleware from '../middleware/authenticate';


const router = express.Router();

const userController = new UserController();
const recipesController = new RecipesController();


// GET /api/v1/users/signup - Registers a new User

router.route('/signup')

  .post(userController.userSignUp);


// POST /api/v1/users/signin - Signs a user in

router.route('/signin')

  .post(userController.userSignIn);


// GET /api/v1/users/myrecipes - Gets a Registered User's recipes

router.route('/myrecipes')

  .get(authenticationMiddleware, recipesController.getMyRecipes);


// GET /api/users/:userId/recipes - Gets another user's recipes with user specified by Id

router.route('/:userId/recipes')

  .get(authenticationMiddleware, recipesController.getUserRecipes);


export default router;
