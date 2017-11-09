'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = require('../database/models/index');

var _index2 = _interopRequireDefault(_index);

var _helpers = require('../helpers');

var _helpers2 = _interopRequireDefault(_helpers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (req, res, next) {
  _index2.default.Recipe.findById(req.params.id).then(function (recipe) {
    if (!recipe) {
      return (0, _helpers2.default)('fail', 404, { message: 'Recipe not found' }, res);
    }

    if (recipe.userId !== req.AuthUser.id) {
      return (0, _helpers2.default)('fail', 401, { message: 'Unauthorized USER' }, res);
    }

    next();
  }).catch(function () {
    return (0, _helpers2.default)('fail', 422, { message: 'Invalid Request' }, res);
  });
};