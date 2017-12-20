'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _downvotes = require('../controllers/downvotes');

var _downvotes2 = _interopRequireDefault(_downvotes);

var _upvotes = require('../controllers/upvotes');

var _upvotes2 = _interopRequireDefault(_upvotes);

var _authenticate = require('../middleware/authenticate');

var _authenticate2 = _interopRequireDefault(_authenticate);

var _canDownvote = require('../middleware/canDownvote');

var _canDownvote2 = _interopRequireDefault(_canDownvote);

var _canUpvote = require('../middleware/canUpvote');

var _canUpvote2 = _interopRequireDefault(_canUpvote);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

var downvotesController = new _downvotes2.default();
var upvotesController = new _upvotes2.default();

// POST api/v1/recipes/:recipeId/upvote - add an upvote to a recipe

router.route('/:recipeId/upvote').post(_authenticate2.default, _canUpvote2.default, upvotesController.addUpvote);

// POST api/v1/recipes/:recipeId/downvote - add a downvote to a recipe

router.route('/:recipeId/downvote').post(_authenticate2.default, _canDownvote2.default, downvotesController.addDownvote);

exports.default = router;