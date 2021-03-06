import express from 'express';
import Users from '../controllers/users';
import authenticate from '../middleware/authenticate';
import userSignupValidator from '../middleware/userSignupValidator';
import userSigninValidator from '../middleware/userSigninValidator';


const router = express.Router();

const userController = new Users();


// POST /api/v1/users/signup - Registers a new User

router.route('/signup')

  .post(userSignupValidator, userController.userSignUp);


// POST /api/v1/users/signin - Signs a user in

router.route('/signin')

  .post(userSigninValidator, userController.userSignIn);

// POST /api/v1/users/signout - Signs out a user

router.route('/signout')

  .post(authenticate, userController.userSignOut);


// GET /api/v1/users/myrecipes - Gets a Registered User's recipes

router.route('/myrecipes')

  .get(authenticate, userController.getMyRecipes);


// GET /api/v1/users/:userId/recipes - Gets another user's recipes with user specified by Id

router.route('/:userId/recipes')

  .get(authenticate, userController.getUserRecipes);

// GET /api/v1/users/:userId - Gets one User

router.route('/:userId')

  .get(userController.findUser);


export default router;
