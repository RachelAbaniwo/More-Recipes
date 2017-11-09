'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = require('../database/models/index');

var _index2 = _interopRequireDefault(_index);

var _helpers = require('../helpers');

var _helpers2 = _interopRequireDefault(_helpers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = async function (req, res, next) {
  try {
    var recipe = await _index2.default.Recipe.findById(req.params.id);

    if (!recipe) {
      return (0, _helpers2.default)('success', 404, { message: 'Recipe not found.' }, res);
    }

    if (recipe.userId === req.AuthUser.id) {
      return (0, _helpers2.default)('fail', 401, { message: 'Unauthorized.' }, res);
    }

    var query = { where: { userId: req.AuthUser.id, recipeId: req.params.recipeId } };

    var upvote = await _index2.default.Upvote.findOne(query);

    if (upvote) {
      await upvote.destroy();
    }

    //  req.currentRecipe = recipe;
    next();
  } catch (error) {
    return (0, _helpers2.default)('fail', 422, { message: 'Invalid format.' }, res);
  }
};