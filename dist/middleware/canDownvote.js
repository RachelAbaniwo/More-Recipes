'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = require('../models/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var Recipe = _index2.default.Recipe,
    Upvote = _index2.default.Upvote;

exports.default = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
    var recipe, query, upvote;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return Recipe.findById(req.params.recipeId);

          case 3:
            recipe = _context.sent;

            if (recipe) {
              _context.next = 6;
              break;
            }

            return _context.abrupt('return', res.status(404).json({ message: 'Recipe not found.' }));

          case 6:
            if (!(recipe.userId === req.AuthUser.id)) {
              _context.next = 8;
              break;
            }

            return _context.abrupt('return', res.status(401).json({ message: 'Unauthorized' }));

          case 8:
            query = { where: { userId: req.AuthUser.id, recipeId: req.params.recipeId } };
            _context.next = 11;
            return Upvote.findOne(query);

          case 11:
            upvote = _context.sent;

            if (!upvote) {
              _context.next = 17;
              break;
            }

            _context.next = 15;
            return upvote.destroy();

          case 15:
            _context.next = 17;
            return recipe.decrement('upvotes');

          case 17:
            next();
            _context.next = 23;
            break;

          case 20:
            _context.prev = 20;
            _context.t0 = _context['catch'](0);
            return _context.abrupt('return', res.status(400).json({ message: 'Invalid request.' }));

          case 23:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 20]]);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();