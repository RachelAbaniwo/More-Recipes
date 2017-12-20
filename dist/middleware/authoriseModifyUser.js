'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = require('../models/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var User = _index2.default.User;

exports.default = function (req, res, next) {
  User.findById(req.params.userId).then(function (user) {
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.id !== req.AuthUser.id) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    next();
  }).catch(function () {
    return res.status(400).json({ message: 'Invalid request' });
  });
};