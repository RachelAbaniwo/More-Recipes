import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../models';


dotenv.config();
const jwtSecret = process.env.JWT_SECRET;

const { User } = db;
const { Recipe } = db;
/**
 * Controls the user endpoints
 */
export default class UserController {
/**
   * adds a new user to database
   * @param {object} req request object from user
   * @param {object} res created user
   * @returns {json} returns created user object
   */
  userSignUp(req, res) {
    User.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, process.env.NODE_ENV === 'test' ? 1 : 10)
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
      res.status(201).json({
        user: createdUser,
        token,
        message: 'Successfully signed up!'
      });
    }).catch((error) => {
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
  userSignIn(req, res) {
    return User.findOne({ where: { email: req.body.email } }).then((user) => {
      if (!user) {
        return res.status(404).json({ message: 'Wrong credentials' });
      }
      if (bcrypt.compareSync(req.body.password, user.password)) {
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
        return res.status(200).json({ user: existingUser, token, message: 'Successfully signed in.' });
      }

      return res.status(404).json({ message: 'Wrong credentials' });
    }).catch((error) => {
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
  findUser(req, res) {
    User.findOne({ where: { id: req.params.userId } }).then((user) => {
      if (!user) {
        return res.status(404).json({
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
      res.status(200).json({
        user: foundUser
      });
    }).catch(() =>
      res.status(400).json({
        message: 'Invalid request'
      }));
  }
  /**
   * gets a user's personal recipes from database
   * @param {object} req request object from user
   * @param {object} res array of recipes
   * @returns {json} returns array of recipes to user
   */
  getMyRecipes(req, res) {
    Recipe.findAll({
      where: { userId: req.AuthUser.id },
      include: [{ all: true, attributes: { exclude: ['password'] }, nested: true }]
    }).then((recipes) => {
      if (recipes.length < 1) {
        return res.status(404).json({
          message: 'You have no recipes'
        });
      } res.status(200).json({
        myRecipes: recipes
      });
    }).catch(error =>
      res.status(500).json({
        message: error.message
      }));
  }
  /**
   * gets any user's personal recipes by the user's id
   * @param {object} req request object from user
   * @param {object} res array of recipes
   * @returns {json} returns array of recipes to user
   */
  getUserRecipes(req, res) {
    User.findOne({ where: { id: req.params.userId } }).then((user) => {
      if (!user) {
        return res.status(404).json({
          message: 'User not found'
        });
      }
      Recipe.findAll({
        where: { userId: req.params.userId },
        include: [{ all: true, attributes: { exclude: ['password'] }, nested: true }]
      }).then((recipes) => {
        if (recipes.length < 1) {
          return res.status(404).json({
            message: 'User has no recipes'
          });
        }
        res.status(200).json({
          recipes
        });
      }).catch(() =>
        res.status(400).json({
          message: 'Invalid request'
        }));
    }).catch(() =>
      res.status(400).json({
        message: 'Invalid request'
      }));
  }
}
