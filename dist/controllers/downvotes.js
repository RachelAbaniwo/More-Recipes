'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

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
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
        var recipe, query, downvote;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return Recipe.findById(req.params.recipeId);

              case 2:
                recipe = _context.sent;
                query = { where: { userId: req.AuthUser.id, recipeId: req.params.recipeId } };
                _context.next = 6;
                return Downvote.findOne(query);

              case 6:
                downvote = _context.sent;

                if (!downvote) {
                  _context.next = 13;
                  break;
                }

                _context.next = 10;
                return downvote.destroy();

              case 10:
                _context.next = 12;
                return recipe.decrement('downvotes');

              case 12:
                return _context.abrupt('return', res.status(200).json({
                  recipe: recipe, message: 'Successfully removed downvote from this recipe'
                }));

              case 13:
                _context.next = 15;
                return Downvote.create({
                  userId: req.AuthUser.id,
                  recipeId: req.params.recipeId
                });

              case 15:
                _context.next = 17;
                return recipe.increment('downvotes');

              case 17:
                return _context.abrupt('return', res.status(201).json({
                  recipe: recipe, message: 'Recipe downvoted successfully'
                }));

              case 18:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function addDownvote(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return addDownvote;
    }()
  }]);

  return DownvotesController;
}();

exports.default = DownvotesController;