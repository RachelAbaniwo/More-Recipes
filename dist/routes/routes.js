'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _recipes = require('./recipes');

var _recipes2 = _interopRequireDefault(_recipes);

var _users = require('./users');

var _users2 = _interopRequireDefault(_users);

var _reviews = require('./reviews');

var _reviews2 = _interopRequireDefault(_reviews);

var _votes = require('./votes');

var _votes2 = _interopRequireDefault(_votes);

var _favorites = require('./favorites');

var _favorites2 = _interopRequireDefault(_favorites);

var _modifyUser = require('./modifyUser');

var _modifyUser2 = _interopRequireDefault(_modifyUser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.use('/recipes', _recipes2.default);
router.use('/users', _users2.default);
router.use('/reviews', _reviews2.default);
router.use('/recipes/', _votes2.default);
router.use('/favorites', _favorites2.default);
router.use('/users', _modifyUser2.default);

exports.default = router;