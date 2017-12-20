'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

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
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
        var query, favorite, _recipe, recipe;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                query = { where: { userId: req.AuthUser.id, recipeId: req.params.recipeId } };
                _context.next = 3;
                return Favorite.findOne(query);

              case 3:
                favorite = _context.sent;

                if (!favorite) {
                  _context.next = 11;
                  break;
                }

                _context.next = 7;
                return favorite.destroy();

              case 7:
                _recipe = req.FavoriteRecipe;
                _context.next = 10;
                return _recipe.decrement('favorites');

              case 10:
                return _context.abrupt('return', res.status(200).json({
                  recipe: _recipe, message: 'Successfully removed this recipe from favorites'
                }));

              case 11:
                _context.next = 13;
                return Favorite.create({
                  userId: req.AuthUser.id,
                  recipeId: req.params.recipeId
                });

              case 13:
                recipe = req.FavoriteRecipe;
                _context.next = 16;
                return recipe.increment('favorites');

              case 16:
                return _context.abrupt('return', res.status(201).json({
                  recipe: recipe, message: 'Recipe successfully added to favorites!'
                }));

              case 17:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function addFavorite(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return addFavorite;
    }()
    /**
     * Get User's Favorite recipes
     * @param {object} req - request to get all the favorite recipes of a user
     * @param {object} res - array of recipes
     * @returns {json} - array of recipes
     */

  }, {
    key: 'getFavorites',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
        var query, favorites, recipeIds, nextQuery, recipes;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                query = { where: { userId: req.AuthUser.id } };
                _context2.next = 4;
                return Favorite.findAll(query);

              case 4:
                favorites = _context2.sent;

                if (!(favorites.length < 1)) {
                  _context2.next = 7;
                  break;
                }

                return _context2.abrupt('return', res.status(404).json({
                  message: 'You have no Favorite Recipes'
                }));

              case 7:
                recipeIds = favorites.map(function (favorite) {
                  return favorite.recipeId;
                });
                nextQuery = {
                  where: { id: _defineProperty({}, _models2.default.Sequelize.Op.in, recipeIds) },
                  include: [{ all: true, attributes: { exclude: ['password'] }, nested: true }]
                };
                _context2.next = 11;
                return Recipe.findAll(nextQuery);

              case 11:
                recipes = _context2.sent;
                return _context2.abrupt('return', res.status(200).json({
                  favoriteRecipes: recipes
                }));

              case 15:
                _context2.prev = 15;
                _context2.t0 = _context2['catch'](0);
                return _context2.abrupt('return', res.status(500).json({
                  message: _context2.t0.message
                }));

              case 18:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 15]]);
      }));

      function getFavorites(_x3, _x4) {
        return _ref2.apply(this, arguments);
      }

      return getFavorites;
    }()
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