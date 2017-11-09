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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
      _models2.default.Recipe.findAll({
        include: { model: _models2.default.User }
      }).then(function (recipes) {
        return (0, _helpers2.default)('success', 200, { recipes: recipes }, res);
      }).catch(function (error) {
        return (0, _helpers2.default)('fail', 500, { message: error.message }, res);
      });
    }
    /**
     * gets a recipe from database
     * @param {object} req express request object
     * @param {object} res express response object
     * @returns {json} json returned to client
     */

  }, {
    key: 'getOneRecipe',
    value: function getOneRecipe(req, res) {
      _models2.default.Recipe.findById(req.params.id).then(function (recipe) {
        if (!recipe) {
          return (0, _helpers2.default)('fail', 404, { message: 'Recipe not found' }, res);
        }
        return (0, _helpers2.default)('success', 200, { recipe: recipe }, res);
      }).catch(function () {
        return (0, _helpers2.default)('fail', 422, { message: 'Invalid Request' }, res);
      });
    }
    /**
     * gets a user's personal recipes from database
     * @param {object} req express request object
     * @param {object} res express response object
     * @returns {json} json returned to client
     */

  }, {
    key: 'getMyRecipes',
    value: function getMyRecipes(req, res) {
      _models2.default.Recipe.findAll({ where: { userId: req.AuthUser.id } }).then(function (recipes) {
        if (recipes.length < 1) {
          return (0, _helpers2.default)('fail', 404, { message: 'You have no Recipes' }, res);
        }(0, _helpers2.default)('success', 200, { recipes: recipes }, res);
      }).catch(function (error) {
        return (0, _helpers2.default)('fail', 500, { message: error.message }, res);
      });
    }
    /**
     * gets any user's recipes from database
     * @param {object} req express request object
     * @param {object} res express response object
     * @returns {json} json returned to client
     */

  }, {
    key: 'getUserRecipes',
    value: function getUserRecipes(req, res) {
      _models2.default.Recipe.findAll({ where: { userId: req.params.id } }).then(function (recipes) {
        if (recipes.length < 1) {
          return (0, _helpers2.default)('fail', 404, { message: 'User has no Recipes' }, res);
        }(0, _helpers2.default)('success', 200, { recipes: recipes }, res);
      }).catch(function () {
        return (0, _helpers2.default)('fail', 422, { message: 'Invalid Request' }, res);
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
        errors.push('Recipe Category is required.');
      }
      if (!req.body.ingredients) {
        errors.push('Recipe Ingredients are required.');
      }
      if (!req.body.description) {
        errors.push('Recipe Description is required.');
      }
      if (!req.body.method) {
        errors.push('Method required.');
      }

      if (errors.length > 0) {
        return (0, _helpers2.default)('fail', 422, { errors: errors, message: 'Please fill all Fields' }, res);
      }
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
      return _models2.default.Recipe.findById(req.params.id).then(function (recipe) {
        recipe.destroy().then(function () {
          return (0, _helpers2.default)('success', 200, { message: 'Successfully deleted recipe' }, res);
        }).catch(function (error) {
          return (0, _helpers2.default)('fail', 500, { message: error.message }, res);
        });
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
      }).catch(function () {
        return (0, _helpers2.default)('fail', 422, { message: 'Invalid Request' }, res);
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
      _models2.default.Recipe.findById(req.params.recipeId).then(function (recipe) {
        if (recipe) {
          _models2.default.Favorite.findOne({ where: { userId: req.AuthUser.id, recipeId: req.params.recipeId } }).then(function (favoritedAlready) {
            if (favoritedAlready) {
              return favoritedAlready.destroy().then(function () {
                return (0, _helpers2.default)('success', 200, { message: 'Successfully removed Recipe from Favorites' }, res);
              }).catch(function (error) {
                return (0, _helpers2.default)('fail', 500, { message: error.message }, res);
              });
            }
            _models2.default.Favorite.create({
              recipeId: recipe.id,
              userId: req.AuthUser.id
            }).then(function () {
              return (0, _helpers2.default)('success', 201, { recipe: recipe, message: 'Favorite recipe successfully added!' }, res);
            });
          });
        } else {
          return (0, _helpers2.default)('fail', 404, { message: 'Recipe to be added not found' }, res);
        }
      }).catch(function () {
        return (0, _helpers2.default)('fail', 422, { message: 'Invalid Request' }, res);
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
      return _models2.default.Favorite.findAll({ where: { userId: req.AuthUser.id } }).then(function (favorites) {
        if (favorites.length < 1) {
          return (0, _helpers2.default)('fail', 404, { message: 'You have no Favorite Recipes' }, res);
        }
        var recipeIds = favorites.map(function (favorite) {
          return favorite.recipeId;
        });
        return _models2.default.Recipe.findAll({
          where: {
            id: _defineProperty({}, _models2.default.Sequelize.Op.in, recipeIds)
          }
        }).then(function (recipes) {
          return (0, _helpers2.default)('success', 200, { recipes: recipes }, res);
        });
      }).catch(function (error) {
        return (0, _helpers2.default)('fail', 500, { message: error.message }, res);
      });
    }
    /**
     * adds Upvotes of recipes to database
     * @param {object} req express request object
     * @param {object} res express response object
     * @returns {json} json returned to client
     */

  }, {
    key: 'addUpvotes',
    value: function addUpvotes(req, res) {
      _models2.default.Recipe.findById(req.params.recipeId).then(function (recipe) {
        if (recipe) {
          _models2.default.Upvote.findOne({ where: { userId: req.AuthUser.id, recipeId: req.params.recipeId } }).then(function (upvotedAlready) {
            if (upvotedAlready) {
              return upvotedAlready.destroy().then(function () {
                return (0, _helpers2.default)('success', 200, { message: 'Successfully removed Upvote from this recipe' }, res);
              }).catch(function (error) {
                return (0, _helpers2.default)('fail', 500, { message: error.message }, res);
              });
            }
            _models2.default.Upvote.create({
              userId: req.AuthUser.id,
              recipeId: req.params.recipeId
            }).then(function (upvotes) {
              return (0, _helpers2.default)('success', 201, { recipe: recipe, upvotes: upvotes, message: 'recipe upvoted successfully' }, res);
            });
          });
        } else {
          return (0, _helpers2.default)('fail', 404, { message: 'Recipe to be upvoted not found' }, res);
        }
      });
    }
    /**
     * add Downvotes of recipes to database
     * @param {object} req express request object
     * @param {object} res express response object
     * @returns {json} json returned to client
     */

  }, {
    key: 'addDownvotes',
    value: async function addDownvotes(req, res) {
      var query = { where: { userId: req.AuthUser.id, recipeId: req.params.recipeId } };
      var downvote = await _models2.default.Downvote.findOne(query);

      if (downvote) {
        await downvote.destroy();
        return (0, _helpers2.default)('success', 200, { message: 'Successfully removed Downvote from this recipe' }, res);
      }

      await _models2.default.Downvote.create({
        userId: req.AuthUser.id,
        recipeId: req.params.recipeId
      });

      return (0, _helpers2.default)('success', 201, { message: 'recipe downvoted successfully' }, res);
    }
  }]);

  return RecipesController;
}();

exports.default = RecipesController;