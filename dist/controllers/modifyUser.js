'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

var _checkInput = require('../helpers/checkInput');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var User = _models2.default.User;

_dotenv2.default.config();
var jwtSecret = process.env.JWT_SECRET;
/**
 * Controls the user endpoints
 */

var ModifyUserController = function () {
  function ModifyUserController() {
    _classCallCheck(this, ModifyUserController);
  }

  _createClass(ModifyUserController, [{
    key: 'updateUser',

    /**
       * updates an existing user's profile
       * @param {object} req user object
       * @param {object} res updated userbobject
       * @returns {json} return updated user
       */
    value: function updateUser(req, res) {
      User.findById(req.params.userId).then(function (user) {
        User.update({
          firstname: (0, _checkInput.returnName)(req.body.firstname) || user.firstname,
          lastname: (0, _checkInput.returnName)(req.body.lastname) || user.lastname,
          username: (0, _checkInput.returnUsername)(req.body.username) || user.username,
          email: (0, _checkInput.returnEmail)(req.body.email) || user.email,
          id: user.id,
          aboutMe: (0, _checkInput.returnParameter)(req.body.aboutMe) || user.aboutMe,
          profilePicture: req.body.imageUrl || user.profilePicture
        }, {
          where: { id: req.params.userId },
          returning: true,
          plain: true
        }).then(function (newUser) {
          var updatedUser = {
            firstname: newUser[1].firstname,
            lastname: newUser[1].lastname,
            username: newUser[1].username,
            email: newUser[1].email,
            id: newUser[1].id,
            aboutMe: newUser[1].aboutMe,
            profilePicture: newUser[1].profilePicture
          };
          res.status(201).json({
            user: updatedUser, message: 'Successfully updated profile'
          });
        }).catch(function (error) {
          return res.status(500).json({
            message: error.message
          });
        });
      }).catch(function () {
        return res.status(400).json({ message: 'Invalid request' });
      });
    }
    /**
       * deletes a user from database
       * @param {object} req user object
       * @param {object} res message
       * @returns {json} returns a message
       */

  }, {
    key: 'deleteUser',
    value: function deleteUser(req, res) {
      return User.findById(req.params.userId).then(function (user) {
        user.destroy().then(function () {
          return res.status(200).json({
            message: 'Successfully deleted user'
          });
        }).catch(function (error) {
          return res.status(500).json({
            message: error.message
          });
        });
      });
    }
  }]);

  return ModifyUserController;
}();

exports.default = ModifyUserController;