'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Favorite = _models2.default.Favorite,
    Recipe = _models2.default.Recipe;
/**
 * Controls the favorites endpoints
 */

var FavoritesController = function () {
  function FavoritesController() {
    _classCallCheck(this, FavoritesController);
  }

  _createClass(FavoritesController, [{
    key: 'addFavorite',

    /**
     * Adds a Recipe to a User's list Favorite recipes
     * @param {object} req - request id of recipe to be added to Favorites
     * @param {object} res - success message indicating recipe added or removed from favorites
     * @returns {json} - success message returned
     */
    value: async function addFavorite(req, res) {
      var query = { where: { userId: req.AuthUser.id, recipeId: req.params.recipeId } };
      var favorite = await Favorite.findOne(query);

      if (favorite) {
        await favorite.destroy();
        var _recipe = req.FavoriteRecipe;
        await _recipe.decrement('favorites');
        return res.status(200).json({
          recipe: _recipe, message: 'Successfully removed this recipe from favorites'
        });
      }

      var newFavorite = await Favorite.create({
        userId: req.AuthUser.id,
        recipeId: req.params.recipeId
      });
      var recipe = req.FavoriteRecipe;
      await recipe.increment('favorites');
      return res.status(201).json({
        recipe: recipe, favorite: newFavorite, message: 'Recipe successfully added to favorites!'
      });
    }
    /**
     * Get User's Favorite recipes
     * @param {object} req - request to get all the favorite recipes of a user
     * @param {object} res - array of recipes
     * @returns {json} - array of recipes
     */

  }, {
    key: 'getFavorites',
    value: async function getFavorites(req, res) {
      try {
        var query = { where: { userId: req.AuthUser.id } };
        var favorites = await Favorite.findAll(query);

        if (favorites.length < 1) {
          return res.status(404).json({
            message: 'You have no favorite recipes'
          });
        }
        var recipeIds = favorites.map(function (favorite) {
          return favorite.recipeId;
        });
        var nextQuery = {
          where: { id: _defineProperty({}, _models2.default.Sequelize.Op.in, recipeIds) },
          include: [{ all: true, attributes: { exclude: ['password'] }, nested: true }]
        };
        var recipes = await Recipe.findAll(nextQuery);
        return res.status(200).json({
          favoriteRecipes: recipes
        });
      } catch (error) {
        return res.status(500).json({
          message: error.message
        });
      }
    }
    /**
       * deletes a recipe from a user's favorites
       * @param {object} req - recipe object
       * @param {object} res - message
       * @returns {json} - message returned
       */

  }, {
    key: 'deleteFavorite',
    value: function deleteFavorite(req, res) {
      return Favorite.findById(req.params.favoriteId).then(function (favorite) {
        favorite.destroy().then(function () {
          return res.status(200).json({
            message: 'Successfully deleted this recipe from your favorites'
          });
        }).catch(function (error) {
          return res.status(500).json({
            message: error.message
          });
        });
      });
    }
  }]);

  return FavoritesController;
}();

exports.default = FavoritesController;