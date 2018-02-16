'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Recipe = _models2.default.Recipe,
    Downvote = _models2.default.Downvote;

/**
 * Controls the Downvote endpoints
 */

var DownvotesController = function () {
  function DownvotesController() {
    _classCallCheck(this, DownvotesController);
  }

  _createClass(DownvotesController, [{
    key: 'addDownvote',

    /**
     * Adds a Downvote to a recipe or Removes the vote if recipe is already Upvoted or Downvoted
     * @param {object} req - Recipe to be voted
     * @param {object} res - success message indicating downvote added or removed
     * @returns {json} - success message returned to User
     */
    value: async function addDownvote(req, res) {
      var recipe = await Recipe.findById(req.params.recipeId);
      var query = { where: { userId: req.AuthUser.id, recipeId: req.params.recipeId } };
      var downvote = await Downvote.findOne(query);

      if (downvote) {
        await downvote.destroy();
        await recipe.decrement('downvotes');
        return res.status(200).json({
          recipe: recipe, message: 'Successfully removed downvote from this recipe'
        });
      }
      await Downvote.create({
        userId: req.AuthUser.id,
        recipeId: req.params.recipeId
      });
      await recipe.increment('downvotes');

      return res.status(201).json({
        recipe: recipe, message: 'Recipe downvoted successfully'
      });
    }
  }]);

  return DownvotesController;
}();

exports.default = DownvotesController;