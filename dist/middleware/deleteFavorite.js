'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = require('../models/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Favorite = _index2.default.Favorite;

exports.default = function (req, res, next) {
  Favorite.findById(req.params.favoriteId).then(function (favorite) {
    if (!favorite) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    if (favorite.userId !== req.AuthUser.id) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    next();
  }).catch(function () {
    return res.status(400).json({ message: 'Invalid request' });
  });
};