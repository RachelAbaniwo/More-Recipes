'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

var _checkInput = require('../helpers/checkInput');

var _pagination = require('../helpers/pagination');

var _pagination2 = _interopRequireDefault(_pagination);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Recipe = _models2.default.Recipe,
    User = _models2.default.User;

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
     * gets all recipes in the database
     * @param {object} req request to get all recipes
     * @param {object} res array of recipes or error
     * @returns {json} returns array of recipes or error
     */
    value: function getRecipes(req, res) {
      var limit = req.query.limit || 6;
      var offset = req.query.offset || 0;
      var operator = _models2.default.Sequelize.Op;
      var search = req.query.search;

      var searchQuery = search ? search.trim() : '';
      if (req.query.sort && req.query.search) {
        return Recipe.findAndCountAll({
          limit: limit,
          offset: offset,
          distinct: true,
          group: ['Recipe.id', 'User.id'],
          order: _models2.default.sequelize.literal('max(' + req.query.sort + ') DESC'),
          include: [{ model: User, attributes: { exclude: ['password'] } }],
          where: _defineProperty({}, operator.or, {
            name: _defineProperty({}, operator.iLike, '%' + searchQuery + '%'),
            description: _defineProperty({}, operator.iLike, '%' + searchQuery + '%'),
            ingredients: _defineProperty({}, operator.iLike, '%' + searchQuery + '%')
          })
        }).then(function (_ref) {
          var recipes = _ref.rows,
              count = _ref.count;

          if (recipes.length === 0) {
            return res.status(404).json({
              message: 'Recipe not found'
            });
          }
          return res.status(200).json({
            recipes: recipes,
            pageData: (0, _pagination2.default)(count.length, limit, offset)
          });
        }).catch(function (error) {
          return res.status(500).json({
            message: error.message
          });
        });
      }
      if (req.query.sort) {
        return Recipe.findAndCountAll({
          limit: limit,
          offset: offset,
          distinct: true,
          group: ['Recipe.id', 'User.id'],
          order: _models2.default.sequelize.literal('max(' + req.query.sort + ') DESC'),
          include: [{ model: User, attributes: { exclude: ['password'] } }]
        }).then(function (_ref2) {
          var recipes = _ref2.rows,
              count = _ref2.count;

          if (recipes.length === 0) {
            return res.status(404).json({
              message: 'Recipe not found'
            });
          }
          return res.status(200).json({
            recipes: recipes,
            pageData: (0, _pagination2.default)(count.length, limit, offset)
          });
        }).catch(function (error) {
          return res.status(500).json({
            message: error.message
          });
        });
      } else if (req.query.search) {
        return Recipe.findAndCountAll({
          limit: limit,
          offset: offset,
          distinct: true,
          include: [{ all: true, attributes: { exclude: ['password'] }, nested: true }],
          where: _defineProperty({}, operator.or, {
            name: _defineProperty({}, operator.iLike, '%' + searchQuery + '%'),
            description: _defineProperty({}, operator.iLike, '%' + searchQuery + '%'),
            ingredients: _defineProperty({}, operator.iLike, '%' + searchQuery + '%')
          })
        }).then(function (_ref3) {
          var recipes = _ref3.rows,
              count = _ref3.count;

          if (recipes.length === 0) {
            return res.status(404).json({
              message: 'Recipe not found'
            });
          }
          return res.status(200).json({
            recipes: recipes,
            pageData: (0, _pagination2.default)(count, limit, offset)
          });
        }).catch(function (error) {
          return res.status(500).json({
            message: error.message
          });
        });
      }
      return Recipe.findAndCountAll({
        limit: limit,
        offset: offset,
        distinct: true,
        include: [{ all: true, attributes: { exclude: ['password'] }, nested: true }]
      }).then(function (_ref4) {
        var recipes = _ref4.rows,
            count = _ref4.count;

        res.status(200).json({
          recipes: recipes,
          pageData: (0, _pagination2.default)(count, limit, offset)
        });
      }).catch(function (error) {
        return res.status(500).json({
          message: error.message
        });
      });
    }

    /**
     * gets a recipe by its id
     * @param {object} req recipe object
     * @param {object} res recipe object
     * @returns {json} recipe returned
     */

  }, {
    key: 'getOneRecipe',
    value: function getOneRecipe(req, res) {
      Recipe.findById(req.params.recipeId, {
        include: [{ all: true, attributes: { exclude: ['password'] }, nested: true }]
      }).then(function (recipe) {
        if (!recipe) {
          return res.status(404).json({
            message: 'Recipe not found'
          });
        }
        return res.status(200).json({
          recipe: recipe
        });
      }).catch(function () {
        return res.status(400).json({
          message: 'Invalid request'
        });
      });
    }
    /**
     * creates a new recipe
     * @param {object} req request from user
     * @param {object} res created recipe or error
     * @returns {json} returns created object or error message
     */

  }, {
    key: 'addRecipes',
    value: function addRecipes(req, res) {
      var errors = [];

      if (!req.body.name || (0, _checkInput.checkField)(req.body.name)) {
        errors.push('Recipe Name is required.');
      }
      if (!req.body.category || (0, _checkInput.checkField)(req.body.category)) {
        errors.push('Recipe Category is required.');
      }
      if (!req.body.ingredients || (0, _checkInput.checkField)(req.body.ingredients)) {
        errors.push('Recipe Ingredients are required.');
      }
      if (!req.body.description || (0, _checkInput.checkField)(req.body.description)) {
        errors.push('Recipe Description is required.');
      }
      if (!req.body.method || (0, _checkInput.checkField)(req.body.method)) {
        errors.push('Method required.');
      }
      if (!req.body.imageUrl) {
        errors.push('Recipe Image is required.');
      }

      if (errors.length > 0) {
        return res.status(400).json({
          errors: errors,
          message: 'Please fill all fields'
        });
      }

      return Recipe.create({
        name: req.body.name,
        category: req.body.category,
        description: req.body.description,
        method: req.body.method,
        ingredients: req.body.ingredients,
        userId: req.AuthUser.id,
        recipeImage: req.body.imageUrl
      }).then(function (recipe) {
        return res.status(201).json({
          recipe: recipe,
          message: 'Successfully created recipe'
        });
      }).catch(function (error) {
        return res.status(500).json({
          message: error.message
        });
      });
    }
    /**
     * updates a recipe
     * @param {object} req recipe to be updated
     * @param {object} res updated recipe
     * @returns {json} updated recipe returned
     */

  }, {
    key: 'updateRecipe',
    value: function updateRecipe(req, res) {
      Recipe.findById(req.params.recipeId).then(function (recipe) {
        Recipe.update({
          name: (0, _checkInput.returnParameter)(req.body.name) || recipe.name,
          category: (0, _checkInput.returnParameter)(req.body.category) || recipe.category,
          description: (0, _checkInput.returnParameter)(req.body.description) || recipe.description,
          method: (0, _checkInput.returnParameter)(req.body.method) || recipe.method,
          ingredients: (0, _checkInput.returnParameter)(req.body.ingredients) || recipe.ingredients,
          recipeImage: req.body.imageUrl || recipe.recipeImage
        }, {
          where: { id: req.params.recipeId },
          returning: true,
          plain: true
        }).then(function (newRecipe) {
          var updatedRecipe = {
            name: newRecipe[1].name,
            category: newRecipe[1].category,
            description: newRecipe[1].description,
            method: newRecipe[1].method,
            ingredients: newRecipe[1].ingredients,
            id: newRecipe[1].id,
            userId: newRecipe[1].userId,
            recipeImage: newRecipe[1].imageUrl

          };
          res.status(201).json({
            recipe: updatedRecipe, message: 'Successfully updated recipe'
          });
        }).catch(function (error) {
          return res.status(500).json({
            message: error.message
          });
        });
      }).catch(function (error) {
        return res.status(500).json({
          message: error.message
        });
      });
    }
    /**
     * deletes a recipe
     * @param {object} req recipe to be deleted
     * @param {object} res message or error
     * @returns {json} returns message
     */

  }, {
    key: 'deleteRecipe',
    value: function deleteRecipe(req, res) {
      return Recipe.findById(req.params.recipeId).then(function (recipe) {
        recipe.destroy().then(function () {
          return res.status(200).json({
            message: 'Successfully deleted recipe'
          });
        }).catch(function (error) {
          return res.status(500).json({
            message: error.message
          });
        });
      });
    }
  }]);

  return RecipesController;
}();

exports.default = RecipesController;