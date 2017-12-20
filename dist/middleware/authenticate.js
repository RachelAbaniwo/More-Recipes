'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();
var jwtSecret = process.env.JWT_SECRET;

exports.default = function (req, res, next) {
  var token = req.headers.token;

  return _jsonwebtoken2.default.verify(token, jwtSecret, function (error, user) {
    if (error) {
      return res.status(401).json({ message: 'Unauthenticated' });
    }

    req.AuthUser = user;
    next();
  });
};