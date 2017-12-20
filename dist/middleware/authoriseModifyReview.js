'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = require('../models/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Review = _index2.default.Review;

exports.default = function (req, res, next) {
  Review.findById(req.params.reviewId).then(function (review) {
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    if (review.userId !== req.AuthUser.id) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    next();
  }).catch(function () {
    return res.status(400).json({ message: 'Invalid request' });
  });
};