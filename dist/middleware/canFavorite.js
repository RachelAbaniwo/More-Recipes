'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = require('../models/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var Recipe = _index2.default.Recipe;

exports.default = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
    var recipe;
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
            req.FavoriteRecipe = recipe;
            next();
            _context.next = 15;
            break;

          case 12:
            _context.prev = 12;
            _context.t0 = _context['catch'](0);
            return _context.abrupt('return', res.status(400).json({ message: 'Invalid request.' }));

          case 15:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 12]]);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();