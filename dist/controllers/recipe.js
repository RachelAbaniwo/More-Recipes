'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _models = require('../database/models');

var _models2 = _interopRequireDefault(_models);

var _helpers = require('../helpers');

var _helpers2 = _interopRequireDefault(_helpers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Controls the recipes endpoints
 */
var RecipesController = function () {
  function RecipesController() {
    _classCallCheck(this, RecipesController);
  }

  _createClass(RecipesController, [{
    key: 'getRecipes',

    /**
     * gets all recipes from database
     * @param {object} req express request object
     * @param {object} res express response object
     * @returns {json} json returned to client
     */
    value: function getRecipes(req, res) {
      _models2.default.Recipe.findAll().then(function (recipes) {
        return (0, _helpers2.default)('success', 200, { recipes: recipes }, res);
      }).catch(function (error) {
        return (0, _helpers2.default)('fail', 500, { message: error.message }, res);
      });
    }
    /**
     * adds recipes to database
     * @param {object} req express request object
     * @param {object} res express response object
     * @returns {json} json returned to client
     */

  }, {
    key: 'addRecipes',
    value: function addRecipes(req, res) {
      var errors = [];

      if (!req.body.name) {
        errors.push('Recipe Name is required.');
      }
      if (!req.body.category) {
        errors.push('Recipe Type is required.');
      }
      if (!req.body.ingredients) {
        errors.push('Recipe Ingredients are required.');
      }
      if (!req.body.description) {
        errors.push('Recipe Description is required.');
      }
      if (!req.body.method) {
        errors.push('Recipe Directions are required.');
      }

      if (errors.length > 0) {
        return (0, _helpers2.default)('fail', 422, { errors: errors, message: 'Please fix the validation errors' }, res);
      }
      console.log(req.AuthUser);
      return _models2.default.Recipe.create({
        name: req.body.name,
        category: req.body.category,
        description: req.body.description,
        method: req.body.method,
        ingredients: req.body.ingredients,
        userId: req.AuthUser.id
      }).then(function (recipe) {
        return (0, _helpers2.default)('success', 200, { recipe: recipe, message: 'Successfully created recipe' }, res);
      }).catch(function (error) {
        return (0, _helpers2.default)('fail', 500, { message: error.message }, res);
      });
    }
    /**
     * updates recipes on database
     * @param {object} req express request object
     * @param {object} res express response object
     * @returns {json} json returned to client
     */

  }, {
    key: 'updateRecipe',
    value: function updateRecipe(req, res) {
      return _models2.default.Recipe.update({
        name: req.body.name,
        category: req.body.category,
        description: req.body.description,
        method: req.body.method,
        ingredients: req.body.ingredients
      }, {
        where: { id: req.params.id },
        returning: true,
        plain: true
      }).then(function (Recipe) {
        return (0, _helpers2.default)('success', 200, { Recipe: Recipe, message: 'Successfully updated recipe' }, res);
      }).catch(function (error) {
        return (0, _helpers2.default)('fail', 500, { message: error.message }, res);
      });
    }

    /**
     * deletes recipes from database
     * @param {object} req express request object
     * @param {object} res express response object
     * @returns {json} json returns message to client
     */

  }, {
    key: 'deleteRecipe',
    value: function deleteRecipe(req, res) {
      _models2.default.Recipe.findById(req.params.id).then(function (recipe) {
        if (recipe) {
          recipe.destroy().then(function () {
            return (0, _helpers2.default)('success', 200, { message: 'Successfully deleted recipe' }, res);
          });
        } else {
          return (0, _helpers2.default)('fail', 500, { message: 'Recipe to be deleted not found' }, res);
        }
      });
    }
    /**
     * adds reviews to recipes database
     * @param {object} req express request object
     * @param {object} res express response object
     * @returns {json} json with updated reviews returned to client
     */

  }, {
    key: 'addReviews',
    value: function addReviews(req, res) {
      if (!req.body.review) {
        return (0, _helpers2.default)('fail', 422, { message: 'Review field empty' }, res);
      }
      _models2.default.Recipe.findById(req.params.id).then(function (recipe) {
        if (recipe) {
          _models2.default.Review.create({
            review: req.body.review,
            recipeId: recipe.id,
            userId: req.AuthUser.id
          }).then(function (review) {
            return (0, _helpers2.default)('success', 201, { recipe: recipe, review: review, message: 'Review successfully added!' }, res);
          });
        } else {
          return (0, _helpers2.default)('fail', 404, { message: 'Recipe to be reviewed not found' }, res);
        }
      });
    }
    /**
     * adds User's Favorite recipes to database
     * @param {object} req express request object
     * @param {object} res express response object
     * @returns {json} json returned to client
     */

  }, {
    key: 'addFavorite',
    value: function addFavorite(req, res) {
      if (!req.AuthUser) {
        return (0, _helpers2.default)('fail', 422, { message: 'Unauthenticated User' }, res);
      }
      _models2.default.Recipe.findById(req.params.recipeId).then(function (recipe) {
        if (recipe) {
          _models2.default.Favorite.create({
            recipeId: recipe.id,
            userId: req.AuthUser.id
          }).then(function () {
            return (0, _helpers2.default)('success', 201, { recipe: recipe, message: 'Favorite recipe successfully added!' }, res);
          });
        } else {
          return (0, _helpers2.default)('fail', 404, { message: 'Recipe to be added not found' }, res);
        }
      });
    }
    /**
     * gets User's Favorite recipes from database
     * @param {object} req express request object
     * @param {object} res express response object
     * @returns {json} json returned to client
     */

  }, {
    key: 'getFavorites',
    value: function getFavorites(req, res) {
      if (!req.AuthUser) {
        return (0, _helpers2.default)('fail', 422, { message: 'Unauthenticated User' }, res);
      }
      _models2.default.Favorite.findAll().then(function (recipes) {
        return (0, _helpers2.default)('success', 200, { recipes: recipes }, res);
      }).catch(function (error) {
        return (0, _helpers2.default)('fail', 500, { message: error.message }, res);
      });
    }
    /*  addUpvotes(req, res) {
       if (!req.AuthUser) {
         return apiResponse('fail', 422, {message: 'Unauthenticated User'}, res);
       }
       db.Recipe.findById(req.params.recipeId).then((recipe) => {
         if (recipe) {
           db.Upvote.create({
             upvotes: recipe.upvotes+1,
             downvotes: recipe.downvotes
           }).then(() => {
             return apiResponse('success', 201, { recipe, message:  'recipe upvoted successfully' }, res); })
         } else {
           return apiResponse('fail', 404, { message: 'Recipe to be upvoted not found' }, res);
         }
       });
     } */

  }]);

  return RecipesController;
}();

exports.default = RecipesController;