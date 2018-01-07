import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../models';
import { checkname, checkUsername, checkPassword } from '../helpers/checkInput';

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
    const errors = [];
    if ((!req.body.Firstname) || (!checkname(req.body.Firstname))) {
      errors.push('First name is Required!');
    }
    if ((!req.body.Lastname) || (!checkname(req.body.Lastname))) {
      errors.push('Last name is Required!');
    }
    if ((!req.body.Username) || (!checkUsername(req.body.Username))) {
      errors.push('Choose your User Name.');
    }
    if (!req.body.Email) {
      errors.push('Email Address is Required!');
    }
    if ((!req.body.Password) || (!checkPassword(req.body.Password))) {
      errors.push('Choose a Password');
    }

    if (errors.length > 0) {
      return res.status(400).json({
        errors,
        message: 'Please fix the validation errors'
      });
    }

    User.create({
      Firstname: req.body.Firstname,
      Lastname: req.body.Lastname,
      Username: req.body.Username,
      Email: req.body.Email,
      Password: bcrypt.hashSync(req.body.Password, 10)
    }).then((user) => {
      const createdUser = {
        firstname: user.Firstname,
        lastname: user.Lastname,
        username: user.Username,
        email: user.Email,
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
    const errors = [];

    if ((!req.body.Username) || (!checkUsername(req.body.Username))) {
      errors.push('Username is required! ');
    }
    if (!req.body.Password) {
      errors.push('Password is required!');
    }
    if (errors.length > 0) {
      return res.status(400).json({ errors, message: 'Please fix the validation errors' });
    }
    return User.findOne({ where: { Username: req.body.Username } }).then((user) => {
      if (!user) {
        return res.status(404).json({ message: 'Wrong credentials' });
      }
      if (bcrypt.compareSync(req.body.Password, user.Password)) {
        const existingUser = {
          firstname: user.Firstname,
          lastname: user.Lastname,
          username: user.Username,
          email: user.Email,
          id: user.id
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
          message: 'User not Found'
        });
      }
      const foundUser = {
        Firstname: user.Firstname,
        Lastname: user.Lastname,
        Username: user.Username,
        Email: user.Email,
        id: user.id
      };
      res.status(200).json({
        foundUser
      });
    }).catch(() =>
      res.status(400).json({
        message: 'Invalid Request'
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
      include: [{ all: true, attributes: { exclude: ['Password'] }, nested: true }]
    }).then((recipes) => {
      if (recipes.length < 1) {
        return res.status(404).json({
          message: 'You have no Recipes'
        });
      } res.status(200).json({
        recipes
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
          message: 'User not Found'
        });
      }
      Recipe.findAll({
        where: { userId: req.params.userId },
        include: [{ all: true, attributes: { exclude: ['Password'] }, nested: true }]
      }).then((recipes) => {
        if (recipes.length < 1) {
          return res.status(404).json({
            message: 'User has no Recipes'
          });
        }
        res.status(200).json({
          recipes
        });
      }).catch(() =>
        res.status(400).json({
          message: 'Invalid Request'
        }));
    }).catch(() =>
      res.status(400).json({
        message: 'Invalid Request'
      }));
  }
}
