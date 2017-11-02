'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _models = require('./../database/models');

var _models2 = _interopRequireDefault(_models);

var _helpers = require('../helpers');

var _helpers2 = _interopRequireDefault(_helpers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Controls the user endpoints
 */
var UserController = function () {
  function UserController() {
    _classCallCheck(this, UserController);
  }

  _createClass(UserController, [{
    key: 'userSignUp',

    /**
       * adds a new user to database
       * @param {object} req express request object
       * @param {object} res express response object
       * @returns {json} json returned to client
       */
    value: function userSignUp(req, res) {
      var errors = [];
      if (!req.body.Firstname) {
        errors.push('Firstname is Required!');
      }
      if (!req.body.Lastname) {
        errors.push('Lastname is required!');
      }
      if (!req.body.Username) {
        errors.push('Choose your User Name.');
      }
      if (!req.body.Email) {
        errors.push('Email Address is required!');
      }
      if (!req.body.Password) {
        errors.push('Choose a Password');
      }

      if (errors.length > 0) {
        return (0, _helpers2.default)('fail', 422, { errors: errors, message: 'Please fix the validation errors' }, res);
      }
      console.log(req.body);
      return _models2.default.User.create({
        Firstname: req.body.Firstname,
        Lastname: req.body.Lastname,
        Username: req.body.Username,
        Email: req.body.Email,
        Password: _bcrypt2.default.hashSync(req.body.Password, 10)
      }).then(function (user) {
        return (0, _helpers2.default)('success', 200, { user: user, message: 'Successfully signed up!' }, res);
      }).catch(function (error) {
        return (0, _helpers2.default)('fail', 500, { message: error.message }, res);
      });
    }
    /**
     * adds a new user to database
     * @param {object} req express request object
     * @param {object} res express response object
     * @returns {json} json returned to client
     */

  }, {
    key: 'userSignIn',
    value: function userSignIn(req, res) {
      var errors = [];

      if (!req.body.Username) {
        errors.push('the Username is required');
      }
      if (!req.body.Password) {
        errors.push('the Password is required');
      }
      if (errors.length > 0) {
        return (0, _helpers2.default)('fail', 422, { errors: errors, message: 'Please fix the validation errors' }, res);
      }
      return _models2.default.User.findOne({ where: { Username: req.body.Username } }).then(function (user) {
        if (!user) {
          return (0, _helpers2.default)('fail', 422, { message: 'User not found' }, res);
        }
        if (_bcrypt2.default.compareSync(req.body.Password, user.Password)) {
          var token = _jsonwebtoken2.default.sign(user.get(), 'secret');
          return (0, _helpers2.default)('success', 200, { token: token, message: 'Successfully signed in.' }, res);
        }return (0, _helpers2.default)('fail', 422, { message: 'Wrong credentials' }, res);
      }).catch(function (error) {
        return (0, _helpers2.default)('fail', 500, { message: error.message }, res);
      });
    }
  }]);

  return UserController;
}();

exports.default = UserController;