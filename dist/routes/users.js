'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _users = require('../controllers/users');

var _users2 = _interopRequireDefault(_users);

var _authenticate = require('../middleware/authenticate');

var _authenticate2 = _interopRequireDefault(_authenticate);

var _userSignupValidator = require('../middleware/userSignupValidator');

var _userSignupValidator2 = _interopRequireDefault(_userSignupValidator);

var _userSigninValidator = require('../middleware/userSigninValidator');

var _userSigninValidator2 = _interopRequireDefault(_userSigninValidator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

var userController = new _users2.default();

// POST /api/v1/users/signup - Registers a new User

router.route('/signup').post(_userSignupValidator2.default, userController.userSignUp);

// POST /api/v1/users/signin - Signs a user in

router.route('/signin').post(_userSigninValidator2.default, userController.userSignIn);

// GET /api/v1/users/myrecipes - Gets a Registered User's recipes

router.route('/myrecipes').get(_authenticate2.default, userController.getMyRecipes);

// GET /api/v1/users/:userId/recipes - Gets another user's recipes with user specified by Id

router.route('/:userId/recipes').get(_authenticate2.default, userController.getUserRecipes);

// GET /api/v1/users/:userId - Gets one User

router.route('/:userId').get(userController.findUser);

exports.default = router;