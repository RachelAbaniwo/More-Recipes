'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _modifyUser = require('../controllers/modifyUser');

var _modifyUser2 = _interopRequireDefault(_modifyUser);

var _authenticate = require('../middleware/authenticate');

var _authenticate2 = _interopRequireDefault(_authenticate);

var _authoriseModifyUser = require('../middleware/authoriseModifyUser');

var _authoriseModifyUser2 = _interopRequireDefault(_authoriseModifyUser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

var modifyUserController = new _modifyUser2.default();

// PUT /api/v1/users/:userId - Updates a User's Profile

router.route('/:userId').put(_authenticate2.default, _authoriseModifyUser2.default, modifyUserController.updateUser);

// DELETE /api/v1/users/:userId - Deletes a User

router.route('/:userId').delete(_authenticate2.default, _authoriseModifyUser2.default, modifyUserController.deleteUser);

exports.default = router;