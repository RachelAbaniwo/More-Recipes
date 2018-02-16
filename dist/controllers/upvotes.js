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
    Upvote = _models2.default.Upvote;

/**
 * Controls the upvote endpoints
 */

var UpvotesController = function () {
  function UpvotesController() {
    _classCallCheck(this, UpvotesController);
  }

  _createClass(UpvotesController, [{
    key: 'addUpvote',

    /**
    * Adds an Upvote to a recipe or Removes the vote if recipe is already Upvoted or Downvoted
    *
    * @param {object} req - Recipe to be voted
    * @param {object} res - success message indicating upvote added or removed
    * 
    * @returns {json} - success message returned to User
    */
    value: async function addUpvote(req, res) {
      var recipe = await Recipe.findById(req.params.recipeId);
      var query = { where: { userId: req.AuthUser.id, recipeId: req.params.recipeId } };
      var upvote = await Upvote.findOne(query);

      if (upvote) {
        await upvote.destroy();
        await recipe.decrement('upvotes');
        return res.status(200).json({
          recipe: recipe, message: 'Successfully removed upvote from this recipe'
        });
      }
      await Upvote.create({
        userId: req.AuthUser.id,
        recipeId: req.params.recipeId
      });
      await recipe.increment('upvotes');

      return res.status(201).json({
        recipe: recipe, message: 'Recipe upvoted successfully'
      });
    }
  }]);

  return UpvotesController;
}();

exports.default = UpvotesController;