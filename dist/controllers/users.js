'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

_dotenv2.default.config();
var jwtSecret = process.env.JWT_SECRET;

var User = _models2.default.User;
var Recipe = _models2.default.Recipe;
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
       * @param {object} req request object from user
       * @param {object} res created user
       * @returns {json} returns created user object
       */
    value: function userSignUp(req, res) {
      User.create({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        email: req.body.email,
        password: _bcrypt2.default.hashSync(req.body.password, process.env.NODE_ENV === 'test' ? 1 : 10)
      }).then(function (user) {
        var createdUser = {
          firstname: user.firstname,
          lastname: user.lastname,
          username: user.username,
          email: user.email,
          id: user.id
        };
        var token = _jsonwebtoken2.default.sign({ id: user.id }, jwtSecret, {
          expiresIn: 60 * 60 * 24
        });
        res.status(201).json({
          user: createdUser,
          token: token,
          message: 'Successfully signed up!'
        });
      }).catch(function (error) {
        res.status(400).json({
          message: error.message
        });
      });
    }
    /**
     * signs user in
     * @param {object} req request object from user
     * @param {object} res message or error
     * @returns {json} message
     */

  }, {
    key: 'userSignIn',
    value: function userSignIn(req, res) {
      return User.findOne({ where: { email: req.body.email } }).then(function (user) {
        if (!user) {
          return res.status(404).json({ message: 'Wrong credentials' });
        }
        if (_bcrypt2.default.compareSync(req.body.password, user.password)) {
          var existingUser = {
            firstname: user.firstname,
            lastname: user.lastname,
            username: user.username,
            email: user.email,
            id: user.id,
            aboutMe: user.aboutMe,
            profilePicture: user.profilePicture
          };
          var token = _jsonwebtoken2.default.sign({ id: user.id }, jwtSecret, {
            expiresIn: 60 * 60 * 24
          });
          return res.status(200).json({ user: existingUser, token: token, message: 'Successfully signed in.' });
        }

        return res.status(404).json({ message: 'Wrong credentials' });
      }).catch(function (error) {
        res.status(500).json({
          message: error.message
        });
      });
    }
    /**
     * finds a user
     * @param {object} req request object from user with user id specified
     * @param {object} res found user object
     * @returns {json} returns user object
     */

  }, {
    key: 'findUser',
    value: function findUser(req, res) {
      User.findOne({ where: { id: req.params.userId } }).then(function (user) {
        if (!user) {
          return res.status(404).json({
            message: 'User not found'
          });
        }
        var foundUser = {
          firstname: user.firstname,
          lastname: user.lastname,
          username: user.username,
          email: user.email,
          id: user.id,
          aboutMe: user.aboutMe
        };
        res.status(200).json({
          user: foundUser
        });
      }).catch(function () {
        return res.status(400).json({
          message: 'Invalid request'
        });
      });
    }
    /**
     * gets a user's personal recipes from database
     * @param {object} req request object from user
     * @param {object} res array of recipes
     * @returns {json} returns array of recipes to user
     */

  }, {
    key: 'getMyRecipes',
    value: function getMyRecipes(req, res) {
      Recipe.findAll({
        where: { userId: req.AuthUser.id },
        include: [{ all: true, attributes: { exclude: ['password'] }, nested: true }]
      }).then(function (recipes) {
        if (recipes.length < 1) {
          return res.status(404).json({
            message: 'You have no recipes'
          });
        }res.status(200).json({
          myRecipes: recipes
        });
      }).catch(function (error) {
        return res.status(500).json({
          message: error.message
        });
      });
    }
    /**
     * gets any user's personal recipes by the user's id
     * @param {object} req request object from user
     * @param {object} res array of recipes
     * @returns {json} returns array of recipes to user
     */

  }, {
    key: 'getUserRecipes',
    value: function getUserRecipes(req, res) {
      User.findOne({ where: { id: req.params.userId } }).then(function (user) {
        if (!user) {
          return res.status(404).json({
            message: 'User not found'
          });
        }
        Recipe.findAll({
          where: { userId: req.params.userId },
          include: [{ all: true, attributes: { exclude: ['password'] }, nested: true }]
        }).then(function (recipes) {
          if (recipes.length < 1) {
            return res.status(404).json({
              message: 'User has no recipes'
            });
          }
          res.status(200).json({
            recipes: recipes
          });
        }).catch(function () {
          return res.status(400).json({
            message: 'Invalid request'
          });
        });
      }).catch(function () {
        return res.status(400).json({
          message: 'Invalid request'
        });
      });
    }
  }]);

  return UserController;
}();

exports.default = UserController;