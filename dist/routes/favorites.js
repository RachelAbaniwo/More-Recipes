'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _favorites = require('../controllers/favorites');

var _favorites2 = _interopRequireDefault(_favorites);

var _canFavorite = require('../middleware/canFavorite');

var _canFavorite2 = _interopRequireDefault(_canFavorite);

var _authenticate = require('../middleware/authenticate');

var _authenticate2 = _interopRequireDefault(_authenticate);

var _deleteFavorite = require('../middleware/deleteFavorite');

var _deleteFavorite2 = _interopRequireDefault(_deleteFavorite);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

var favoritesController = new _favorites2.default();

// GET /api/v1/favorites - Gets signed in user favorites

router.route('/').get(_authenticate2.default, favoritesController.getFavorites);

// POST /api/v1/favorites/:recipeId

router.route('/:recipeId').post(_authenticate2.default, _canFavorite2.default, favoritesController.addFavorite);

// DELETE /api/v1/favorites/:favoriteId

router.route('/:favoriteId').delete(_authenticate2.default, _deleteFavorite2.default, favoritesController.deleteFavorite);

exports.default = router;