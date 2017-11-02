'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _helpers = require('../helpers');

var _helpers2 = _interopRequireDefault(_helpers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (req, res, next) {
  var token = req.body.token || req.headers.token;

  return _jsonwebtoken2.default.verify(token, 'secret', function (error, user) {
    if (error) {
      return (0, _helpers2.default)('fail', 401, { message: error.message }, res);
    }

    req.AuthUser = user;
    next();
  });
};