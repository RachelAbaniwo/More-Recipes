import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../models';


dotenv.config();
const jwtSecret = process.env.JWT_SECRET;

const { User, Recipe, Token } = db;
/**
 * Controls the user endpoints
 * @class UserController
 */
export default class UserController {
  /**
     * adds a new user to database
     * @function userSignUp
     *
     * @param {object} request request object from user
     * @param {object} response created user
     *
     * @returns {json} returns created user object and success message or error
     */
  userSignUp(request, response) {
    User.create({
      firstname: request.body.firstname,
      lastname: request.body.lastname,
      username: request.body.username,
      email: request.body.email,
      password:
      bcrypt.hashSync(request.body.password, process.env.NODE_ENV ===
        'test' ? 1 : 10)
    }).then((user) => {
      const createdUser = {
        firstname: user.firstname,
        lastname: user.lastname,
        username: user.username,
        email: user.email,
        id: user.id
      };
      const token = jwt.sign({ id: user.id }, jwtSecret, {
        expiresIn: 60 * 60 * 24
      });
      response.status(201).json({
        user: createdUser,
        token,
        message: 'Successfully signed up!'
      });
    }).catch((error) => {
      response.status(400).json({
        message: error.message
      });
    });
  }
  /**
   * signs user in
   * @function userSignIn
   *
   * @param {object} request request object from user
   * @param {object} response found user object
   *
   * @returns {json} user object and success or error message
   */
  userSignIn(request, response) {
    return User.findOne({ where: { email: request.body.email } }).then((user) => {
      if (!user) {
        return response.status(422).json({ message: 'Wrong credentials' });
      }
      if (bcrypt.compareSync(request.body.password, user.password)) {
        const existingUser = {
          firstname: user.firstname,
          lastname: user.lastname,
          username: user.username,
          email: user.email,
          id: user.id,
          aboutMe: user.aboutMe,
          profilePicture: user.profilePicture
        };
        const token = jwt.sign({ id: user.id }, jwtSecret, {
          expiresIn: 60 * 60 * 24
        });
        return response.status(200).json({ user: existingUser, token, message: 'Successfully signed in.' });
      }

      return response.status(422).json({ message: 'Wrong credentials' });
    }).catch((error) => {
      response.status(500).json({
        message: error.message
      });
    });
  }
  /**
   * finds a user
   * @function findUser
   *
   * @param {object} request request object from user with user id specified
   * @param {object} response found user object
   *
   * @returns {json} returns user object or error message
   */
  findUser(request, response) {
    User.findOne({ where: { id: request.params.userId } }).then((user) => {
      if (!user) {
        return response.status(404).json({
          message: 'User not found'
        });
      }
      const foundUser = {
        firstname: user.firstname,
        lastname: user.lastname,
        username: user.username,
        email: user.email,
        id: user.id,
        aboutMe: user.aboutMe
      };
      response.status(200).json({
        user: foundUser
      });
    }).catch(() =>
      response.status(400).json({
        message: 'Invalid request'
      }));
  }
  /**
   * gets a user's personal recipes from database
   * @function getMyRecipes
   *
   * @param {object} request request object from user
   * @param {object} response contains array of recipes
   *
   * @returns {json} returns array of recipes or error message to user
   */
  getMyRecipes(request, response) {
    Recipe.findAll({
      where: { userId: request.AuthUser.id },
      include: [{ all: true, attributes: { exclude: ['password'] }, nested: true }]
    }).then((recipes) => {
      if (recipes.length < 1) {
        return response.status(404).json({
          message: 'You have no recipes'
        });
      } response.status(200).json({
        myRecipes: recipes
      });
    }).catch(error =>
      response.status(500).json({
        message: error.message
      }));
  }
  /**
   * gets any user's personal recipes by the user's id
   * @function getUserRecipes
   *
   * @param {object} request request object from user
   * @param {object} response contains array of recipes
   *
   * @returns {json} returns array of recipes or error message to user
   */
  getUserRecipes(request, response) {
    User.findOne({ where: { id: request.params.userId } }).then((user) => {
      if (!user) {
        return response.status(404).json({
          message: 'User not found'
        });
      }
      Recipe.findAll({
        where: { userId: request.params.userId },
        include: [{ all: true, attributes: { exclude: ['password'] }, nested: true }]
      }).then((recipes) => {
        if (recipes.length < 1) {
          return response.status(404).json({
            message: 'User has no recipes'
          });
        }
        response.status(200).json({
          recipes
        });
      }).catch(() =>
        response.status(400).json({
          message: 'Invalid request'
        }));
    }).catch(() =>
      response.status(400).json({
        message: 'Invalid request'
      }));
  }

  /**
   * signs out user
   * @function userSignOut
   *
   * @param {object} request express request object
   * @param {object} response express response object
   *
   * @returns {string} confirmation of user signout
   */
  userSignOut(request, response) {
    return Token.create({
      token: request.authUserToken
    }).then(() => response.json({ message: 'Successfully signed out.' }));
  }
}
