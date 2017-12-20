'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _recipes = require('../controllers/recipes');

var _recipes2 = _interopRequireDefault(_recipes);

var _authenticate = require('../middleware/authenticate');

var _authenticate2 = _interopRequireDefault(_authenticate);

var _authorise = require('../middleware/authorise');

var _authorise2 = _interopRequireDefault(_authorise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

var recipesController = new _recipes2.default();

// GET /api/v1/recipes - gets all recipes in database

router.route('/').get(recipesController.getRecipes);

// GET /api/v1/recipes/:recipeId - gets a particular recipe with Id specified

router.route('/:recipeId').get(recipesController.getOneRecipe);

// POST /api/v1/recipes - creates a new recipe

router.route('/').post(_authenticate2.default, recipesController.addRecipes);

// PUT api/v1/recipes/:recipeId - updates an existing recipe specified by Id

router.route('/:recipeId').put(_authenticate2.default, _authorise2.default, recipesController.updateRecipe);

// DELETE api/v1/recipes/:recipeId - deletes the recipe specified by Id

router.route('/:recipeId').delete(_authenticate2.default, _authorise2.default, recipesController.deleteRecipe);

exports.default = router;