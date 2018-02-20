'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = require('../models/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Downvote = _index2.default.Downvote,
    Recipe = _index2.default.Recipe;

exports.default = async function (req, res, next) {
  try {
    var recipe = await Recipe.findById(req.params.recipeId);

    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found.' });
    }

    if (recipe.userId === req.AuthUser.id) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    var query = { where: { userId: req.AuthUser.id, recipeId: req.params.recipeId } };

    var downvote = await Downvote.findOne(query);

    if (downvote) {
      await downvote.destroy();
      await recipe.decrement('downvotes');
    }
    next();
  } catch (error) {
    return res.status(400).json({ message: 'Invalid request.' });
  }
};